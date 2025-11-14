import { RadioStation } from "@/types/radio";
import { Play, Pause, Timer, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { TimerDialog } from "./TimerDialog";

interface NowPlayingBarProps {
  station: RadioStation;
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  timeRemaining: number | null;
  onSetTimer: (minutes: number | null) => void;
  language: string;
}

export const NowPlayingBar = ({
  station,
  isPlaying,
  onPlayPause,
  volume,
  onVolumeChange,
  timeRemaining,
  onSetTimer,
  language,
}: NowPlayingBarProps) => {
  const [showTimer, setShowTimer] = useState(false);
  const stationName = station.translatedNames[language] || station.name;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              {station.favicon ? (
                <img 
                  src={station.favicon} 
                  alt={stationName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                "📻"
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{stationName}</h3>
              {timeRemaining && (
                <p className="text-xs text-muted-foreground">
                  Sleep in {formatTime(timeRemaining)}
                </p>
              )}
            </div>

            <button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowTimer(true)}
              className="w-10 h-10 rounded-full glass-hover flex items-center justify-center"
            >
              <Timer className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Volume2 className="w-4 h-4 text-muted-foreground" />
            )}
            <Slider
              value={[volume]}
              onValueChange={([v]) => onVolumeChange(v)}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 text-right">
              {volume}%
            </span>
          </div>
        </div>
      </div>

      <TimerDialog
        open={showTimer}
        onOpenChange={setShowTimer}
        onSetTimer={onSetTimer}
      />
    </>
  );
};
