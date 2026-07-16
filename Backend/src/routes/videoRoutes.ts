// src/routes/videoRoutes.ts
import express, { Request, Response } from "express";
import { Video } from "../models/Video";
import { fetchDynamicCookingVideos } from "../services/youtubeService";

const router = express.Router();

// 1. Define the interface for the videos returned by our service
interface YouTubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  channelTitle: string;
}

// Route: GET /api/videos/feed/:category
router.get(
  "/feed/:category",
  async (req: Request, res: Response): Promise<any> => {
    const { category } = req.params;
    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    try {
      // Check our database cache first
      const cachedVideos = await Video.find({ category }).sort({
        createdAt: -1,
      });

      if (cachedVideos.length > 0) {
        const latestVideoDate = new Date(cachedVideos[0].createdAt).getTime();
        const isCacheFresh =
          Date.now() - latestVideoDate < CACHE_EXPIRATION_TIME;

        if (isCacheFresh) {
          console.log(`📦 Returning cached videos for: ${category}`);
          return res.json(cachedVideos);
        }
      }

      console.log(`📡 Fetching fresh YouTube videos for: ${category}...`);
      const searchQuery = `${category} food`;

      // Cast the returned data to our YouTubeVideo array
      const freshVideos = (await fetchDynamicCookingVideos(
        searchQuery,
        8,
      )) as YouTubeVideo[];

      if (freshVideos.length === 0) {
        return res.json(cachedVideos);
      }

      // 2. Explicitly type 'vid' as 'YouTubeVideo' here
      const savedVideos = await Promise.all(
        freshVideos.map(async (vid: YouTubeVideo) => {
          return await Video.findOneAndUpdate(
            { externalVideoId: vid.videoId },
            {
              title: vid.title,
              platform: "youtube",
              videoUrl: `https://www.youtube.com/watch?v=${vid.videoId}`,
              externalVideoId: vid.videoId,
              thumbnailUrl: vid.thumbnail,
              creatorName: vid.channelTitle,
              category: category,
              createdAt: new Date(),
            },
            { upsert: true, new: true },
          );
        }),
      );

      res.json(savedVideos);
    } catch (error) {
      console.error(`❌ Error in video feed route:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Backend: src/routes/videoRoutes.ts (or your backend router)

router.get(
  "/all",
  async (req: Request, res: Response): Promise<any> => {
    try {
      let cachedVideos = await Video.find({}).sort({ createdAt: -1 });

      // 🚨 COLD START: If the database is wiped or empty, automatically seed it!
      if (cachedVideos.length === 0) {
        console.log("🚨 Database is empty! Seeding starting categories...");
        
        // Let's seed a few primary categories instantly to wake up the feed
        const seedCategories = ['Korean', 'Nigerian', 'Italian', 'Mexican', 'Japanese'];
        
        await Promise.all(
          seedCategories.map(async (category) => {
            const searchQuery = `${category} food`;
            try {
              // Fetch 30 fresh videos
              const freshVideos = (await fetchDynamicCookingVideos(searchQuery, 30)) as YouTubeVideo[];
              
              if (freshVideos && freshVideos.length > 0) {
                await Promise.all(
                  freshVideos.map(async (vid: YouTubeVideo) => {
                    await Video.findOneAndUpdate(
                      { externalVideoId: vid.videoId },
                      {
                        title: vid.title,
                        platform: "youtube",
                        videoUrl: `https://www.youtube.com/watch?v=${vid.videoId}`,
                        externalVideoId: vid.videoId,
                        thumbnailUrl: vid.thumbnail,
                        creatorName: vid.channelTitle,
                        category: category,
                        createdAt: new Date(),
                      },
                      { upsert: true, new: true }
                    );
                  })
                );
              }
            } catch (err) {
              console.error(`Failed to seed ${category}:`, err);
            }
          })
        );

        // Re-query the database now that it has been populated
        cachedVideos = await Video.find({}).sort({ createdAt: -1 });
      }

      console.log(`📦 Returning ${cachedVideos.length} compiled cache videos for all countries`);
      return res.json(cachedVideos);
    } catch (error) {
      console.error(`❌ Error fetching compiled video feed:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
