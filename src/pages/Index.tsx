import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { RadioStation, Language } from "@/types/radio";
import { languages } from "@/data/languages";
import { StationCard } from "@/components/StationCard";
import { NowPlayingBar } from "@/components/NowPlayingBar";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const { toast } = useToast();
  const selectedLanguage = languages.find(lang => lang.code === "ar")!;
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fetch stations from API
    fetch("https://api.jsonsilo.com/public/ae27e122-0da2-414c-b4e7-2504961f96e9")
      .then((res) => res.json())
      .then((data) => {
        const formattedStations: RadioStation[] = data.map((station: any) => ({
          id: station.stationuuid || Math.random().toString(),
          name: station.name || "Unknown Station",
          translatedNames: station.translated_names || {},
          urlResolved: station.url_resolved || "",
          urlResolved2: station.url_resolved2 || "",
          urlResolved3: station.url_resolved3 || "",
          favicon: station.favicon || "",
          isHLS: station.hls === 1,
        }));
        
        // Sort: HLS first, then stations with favicons
        formattedStations.sort((a, b) => {
          if (a.isHLS && !b.isHLS) return -1;
          if (!a.isHLS && b.isHLS) return 1;
          if (a.favicon && !b.favicon) return -1;
          if (!a.favicon && b.favicon) return 1;
          return 0;
        });
        
        setStations(formattedStations);
      })
      .catch((err) => {
        console.error("Error fetching stations:", err);
        toast({
          title: "Error",
          description: "Failed to load radio stations. Please try again.",
          variant: "destructive",
        });
      });

    // Initialize audio element
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const playStation = async (station: RadioStation) => {
    if (!audioRef.current) return;

    const urls = [station.urlResolved, station.urlResolved2, station.urlResolved3].filter(Boolean);
    
    let success = false;
    for (const url of urls) {
      try {
        audioRef.current.src = url;
        await audioRef.current.play();
        success = true;
        setCurrentStation(station);
        setIsPlaying(true);
        break;
      } catch (err) {
        console.error(`Failed to play ${url}:`, err);
      }
    }

    if (!success) {
      toast({
        title: "Playback Error",
        description: "Unable to play this station. Please try another one.",
        variant: "destructive",
      });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentStation) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Playback error:", err);
        toast({
          title: "Playback Error",
          description: "Unable to resume playback.",
          variant: "destructive",
        });
      });
      setIsPlaying(true);
    }
  };

  const handleSetTimer = (minutes: number | null) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (minutes === null) {
      setTimeRemaining(null);
      return;
    }

    const totalSeconds = minutes * 60;
    setTimeRemaining(totalSeconds);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            setCurrentStation(null);
          }
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          toast({
            title: "Sleep Timer",
            description: "Playback stopped. Sweet dreams! 🌙",
          });
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-32">
      <header className="sticky top-0 z-10 glass border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">اذاعات القرآن الكريم</h1>
          </div>
          <button
            onClick={() => setShowAbout(true)}
            className="glass-hover rounded-full p-3"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {stations.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-4xl mb-4">📻</div>
            <p className="text-muted-foreground">Loading stations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stations.map((station, index) => (
              <div
                key={station.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <StationCard
                  station={station}
                  isCurrentlyPlaying={currentStation?.id === station.id}
                  onPlay={() => playStation(station)}
                  language={selectedLanguage.code}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {currentStation && (
        <NowPlayingBar
          station={currentStation}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          volume={volume}
          onVolumeChange={setVolume}
          timeRemaining={timeRemaining}
          onSetTimer={handleSetTimer}
          language={selectedLanguage.code}
        />
      )}

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="glass border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">عن التطبيق</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-right" dir="rtl">
            <div>
              <h3 className="text-lg font-semibold mb-2">اذاعات القرآن الكريم</h3>
              <p className="text-muted-foreground">
                استمع إلى محطات الراديو الإسلامية التي تبث القرآن الكريم والمحاضرات الدينية من جميع أنحاء العالم على مدار الساعة.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">المميزات</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>بث مباشر على مدار الساعة</li>
                <li>مؤقت النوم التلقائي</li>
                <li>التحكم في مستوى الصوت</li>
                <li>واجهة سهلة الاستخدام</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground text-center">
                للتواصل: <a href="mailto:ahmed.essa@outlook.it" className="text-primary hover:underline">ahmed.essa@outlook.it</a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
