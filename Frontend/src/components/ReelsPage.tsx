// src/components/ReelsPage.tsx
import { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';
import type { Video } from '../services/api';
import { Loader2, AlertCircle, RefreshCw, ChefHat } from 'lucide-react';

const CATEGORIES = ['Korean', 'Nigerian', 'Italian', 'Mexican', 'Japanese'];

function VideoReel({ video, isActive }: { video: Video; isActive: boolean }) {
  const getEmbedUrl = (vid: Video) => {
    const playParam = isActive ? 'autoplay=1&mute=0' : 'autoplay=0&mute=1';
    return `https://www.youtube-nocookie.com/embed/${vid.externalVideoId}?${playParam}&loop=1&playlist=${vid.externalVideoId}&controls=1&modestbranding=1&rel=0`;
  };

  return (
    <div className="w-full h-full shrink-0 snap-start flex flex-col justify-center items-center py-2">
      <div className="relative w-full max-w-[320px] md:max-w-[340px] h-full bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
        {isActive ? (
          <iframe
            title={video.title}
            src={getEmbedUrl(video)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full relative">
            <img
              src={video.thumbnailUrl}
              alt="thumbnail"
              className="w-full h-full object-cover blur-sm opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-600" />
            </div>
          </div>
        )}

        {/* Floating Overlay Metadata */}
        <div className="absolute bottom-12 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1">
            <ChefHat className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-400">
              @{video.creatorName}
            </span>
          </div>
          <h3 className="font-semibold text-sm line-clamp-2 text-white/95 leading-snug">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function ReelsPage() {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [activeCategory, setActiveCategory] = useState('Korean');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📱 Detect mobile screens (less than 768px wide)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor viewport size to toggle layout configuration dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch ALL videos once on mount to handle client filtering
  const fetchAllVideos = async () => {
    setIsLoading(true);
    setError(null);
    setCurrentIndex(0);
    try {
      // Fetch the full catalog of videos
      const response = await api.get('/videos');
      setAllVideos(response.data);
    } catch (err: any) {
      console.error("❌ Failed to fetch video catalog:", err);
      setError("Unable to load reels. Check if your Backend server is running!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  // 🔎 Filter Selection: Mobile sees everything, desktop filters by selected button!
  const displayedVideos = allVideos.filter((video) => {
    if (isMobile) return true; // Mobile gets uninterrupted, combined continuous feed

    // Desktop: Match category to video schema's country value
    const target = activeCategory.toLowerCase();
    const videoCountry = video.countryOfOrigin?.toLowerCase() || '';

    // Map region names to database variations
    const countryMap: Record<string, string[]> = {
      korean: ['south korea', 'korea', 'korean'],
      japanese: ['japan', 'japanese'],
      italian: ['italy', 'italian'],
      nigerian: ['nigeria', 'nigerian'],
      mexican: ['mexico', 'mexican']
    };

    const validMatches = countryMap[target] || [target];
    return validMatches.includes(videoCountry);
  });

  const handleScroll = () => {
    if (!containerRef.current || displayedVideos.length === 0) return;
    const container = containerRef.current;

    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    if (itemHeight === 0) return;

    const currentIdx = Math.round(scrollTop / itemHeight);
    if (currentIdx !== currentIndex && currentIdx >= 0 && currentIdx < displayedVideos.length) {
      setCurrentIndex(currentIdx);
    }
  };

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col overflow-hidden">

      {/* 1. Category Picker Header (Hidden on Mobile, Displayed on Desktop Only) */}
      {!isMobile && (
        <div className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 z-10 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0); // Reset reel position back to top when swapping tabs
                if (containerRef.current) containerRef.current.scrollTop = 0;
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer ${activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/40'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
            >
              {cat} Reels
            </button>
          ))}
        </div>
      )}

      {/* 2. Constrained Main Display Screen */}
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden h-[calc(100vh-4.5rem)]">

        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
            <p className="text-sm font-semibold text-zinc-500">Connecting to global feed...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center gap-3 p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl max-w-md text-center">
            <AlertCircle className="w-10 h-10 text-rose-500" />
            <p className="text-zinc-400 text-sm">{error}</p>
            <button
              onClick={fetchAllVideos}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* Dynamic scroll feed */}
        {!isLoading && !error && displayedVideos.length > 0 && (
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full max-w-[340px] md:max-w-[360px] h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayedVideos.map((vid, idx) => (
              <VideoReel
                key={vid._id}
                video={vid}
                isActive={idx === currentIndex}
              />
            ))}
          </div>
        )}

        {/* Fallback layout if video arrays evaluate to zero */}
        {!isLoading && !error && displayedVideos.length === 0 && (
          <div className="text-zinc-500 text-sm font-medium">
            No reels found in the collection yet.
          </div>
        )}
      </div>
    </div>
  );
}