// src/services/youtubeService.ts
import axios from "axios";

// Helper function to convert ISO 8601 duration (like "PT4M12S") to seconds
const parseISO8601ToSeconds = (durationStr: string): number => {
  // Regex now optionally matches Days (\d+D) before the optional Time (T...) portion
  const regex = /P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
  const matches = durationStr.match(regex);
  if (!matches) return 0;

  const days = parseInt(matches[1] || "0", 10);
  const hours = parseInt(matches[2] || "0", 10);
  const minutes = parseInt(matches[3] || "0", 10);
  const seconds = parseInt(matches[4] || "0", 10);

  // 1 Day = 86,400 seconds
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

export const fetchDynamicCookingVideos = async (
  searchQuery: string,
  maxResults: number = 30,
) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error("❌ Missing YOUTUBE_API_KEY in .env file!");
    return [];
  }

  try {
    // 1. Search for video items matching query
    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: apiKey,
          q: `${searchQuery} recipe cooking`,
          part: "snippet",
          type: "video",
          videoEmbeddable: "true", // Essential for playing videos in our custom UI
          videoDuration: "short", // Focuses primarily on short clips (usually <4 mins)
          maxResults: maxResults,
          relevanceLanguage: "en",
        },
      },
    );

    const videoIds = searchResponse.data.items
      .map((item: any) => item.id.videoId)
      .join(",");
    if (!videoIds) return [];

    // 2. Fetch detailed content details (specifically for durations)
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: apiKey,
          id: videoIds,
          part: "contentDetails,snippet",
        },
      },
    );

    // 3. Keep only videos <= 5 minutes (300 seconds)
    const FIVE_MINUTES_IN_SECONDS = 300;

    return detailsResponse.data.items
      .filter((item: any) => {
        const seconds = parseISO8601ToSeconds(item.contentDetails.duration);
        return seconds > 0 && seconds <= FIVE_MINUTES_IN_SECONDS;
      })
      .map((item: any) => ({
        title: item.snippet.title,
        videoId: item.id,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url,
        channelTitle: item.snippet.channelTitle,
      }));
  } catch (error) {
    console.error("❌ Error fetching from YouTube:", error);
    return [];
  }
};
