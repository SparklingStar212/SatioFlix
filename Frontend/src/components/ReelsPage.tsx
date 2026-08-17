// src/components/ReelsPage.tsx
import { useEffect, useState, useRef, useMemo } from 'react';
import { api } from '../services/api';
import type { Video } from '../services/api';
import { Loader2, AlertCircle, RefreshCw, ChefHat, Search, X } from 'lucide-react';

// 🎲 High-performance Fisher-Yates Shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ⚡ Fast, optimized thumbnail generator using YouTube's direct CDN
const getOptimizedThumbnail = (video: Video): string => {
  const rawUrl = video.thumbnailUrl || (video.externalVideoId ? `https://img.youtube.com/vi/${video.externalVideoId}/hqdefault.jpg` : '');
  if (!rawUrl) return '';
  return `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=480&q=75&output=webp`;
};

function VideoReel({
  video,
  isActive,
  index,
  onVisible,
}: {
  video: Video;
  isActive: boolean;
  index: number;
  onVisible: (index: number) => void;
}) {
  const reelRef = useRef<HTMLDivElement>(null);

  // ⚡ IntersectionObserver tracks visible video smoothly without onScroll recalculations
  useEffect(() => {
    const element = reelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(index);
        }
      },
      {
        threshold: 0.6, // Fire when 60% of the reel is in view
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [index, onVisible]);

  const embedUrl = useMemo(() => {
    if (!isActive) return '';
    return `https://www.youtube-nocookie.com/embed/${video.externalVideoId}?autoplay=1&mute=0&loop=1&playlist=${video.externalVideoId}&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0`;
  }, [isActive, video.externalVideoId]);

  return (
    <div
      ref={reelRef}
      className="w-full h-full shrink-0 snap-start flex flex-col justify-center items-center"
    >
      <div className="relative w-full h-full md:max-w-87.5 md:h-[85vh] bg-black md:rounded-3xl overflow-hidden border-0 md:border md:border-zinc-800 shadow-2xl flex items-center justify-center">
        {isActive ? (
          <iframe
            title={video.title}
            src={embedUrl}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="w-full h-full relative">
            <img
              src={getOptimizedThumbnail(video)}
              alt={video.title || "thumbnail"}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover blur-sm opacity-50 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-600" />
            </div>
          </div>
        )}

        {/* Floating Overlay Metadata */}
        <div className="absolute bottom-16 md:bottom-30 left-0 w-full p-6 md:p-4 bg-linear-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end pointer-events-none z-10">
          <div className="flex items-center gap-1.5 mb-1.5">
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔎 Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const fetchAllVideos = async () => {
    setIsLoading(true);
    setError(null);
    setCurrentIndex(0);

    try {
      const cachedFeed = sessionStorage.getItem('satio_compiled_reels');
      if (cachedFeed) {
        try {
          const parsedFeed = JSON.parse(cachedFeed);
          setAllVideos(shuffleArray(parsedFeed));
          setIsLoading(false);
          return;
        } catch {
          sessionStorage.removeItem('satio_compiled_reels');
        }
      }

      const response = await api.get('/videos/all');
      const combinedVideos: Video[] = response.data;

      const uniqueVideosMap: Record<string, Video> = {};
      combinedVideos.forEach((video) => {
        if (video && video._id) {
          uniqueVideosMap[video._id] = video;
        }
      });

      const uniqueVideosList = Object.values(uniqueVideosMap);
      sessionStorage.setItem('satio_compiled_reels', JSON.stringify(uniqueVideosList));
      setAllVideos(shuffleArray(uniqueVideosList));
    } catch (err: any) {
      console.error("❌ Failed to fetch compiled video feed:", err);
      setError("Unable to load reels. Check if your Backend server is running!");
    } finally {
      setIsLoading(false);
    }
  };

  // ⚡ Memoized Filter prevents re-filtering on active video changes
  const displayedVideos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allVideos;

    return allVideos.filter((video) => {
      if (!video) return false;
      return (
        video.title?.toLowerCase().includes(query) ||
        video.creatorName?.toLowerCase().includes(query) ||
        video.category?.toLowerCase().includes(query)
      );
    });
  }, [allVideos, searchQuery]);

  const handleReelVisible = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col overflow-hidden relative">

      {/* 🔎 Dynamic Slideout Search Container */}
      <div className="absolute top-4 left-4 right-4 z-30 max-w-md mx-auto flex items-center gap-2">
        {isSearchOpen ? (
          <div className="flex-1 relative flex items-center animate-in slide-in-from-top duration-300">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country reels or creators..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
                if (containerRef.current) containerRef.current.scrollTop = 0;
              }}
              className="w-full pl-11 pr-12 py-2.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 transition-all shadow-lg"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Close Search Button */}
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
                setCurrentIndex(0);
                if (containerRef.current) containerRef.current.scrollTop = 0;
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="ml-auto p-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-all shadow-lg text-zinc-300 hover:text-white cursor-pointer z-40"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main viewport area */}
      <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-6 relative overflow-hidden h-full">

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

        {/* Dynamic Snap Scrolling Frame */}
        {!isLoading && !error && displayedVideos.length > 0 && (
          <div className="absolute inset-0 md:relative md:h-full w-full flex flex-col items-center justify-center">
            <div
              ref={containerRef}
              className="w-full md:max-w-90 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth flex flex-col [scrollbar-none] [&::-webkit-scrollbar]:hidden z-10"
            >
              {displayedVideos.map((vid, idx) => (
                <VideoReel
                  key={vid._id}
                  video={vid}
                  index={idx}
                  isActive={idx === currentIndex}
                  onVisible={handleReelVisible}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && displayedVideos.length === 0 && (
          <div className="text-center p-6 space-y-2">
            <p className="text-zinc-500 text-sm font-medium">No reels found matching your criteria.</p>
            {searchQuery && <p className="text-xs text-zinc-600">Try adjusting your search filters!</p>}
          </div>
        )}
      </div>
    </div>
  );
}