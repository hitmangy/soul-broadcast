import { RadioStation } from "@/types/radio";
import { Radio } from "lucide-react";

interface StationCardProps {
  station: RadioStation;
  isCurrentlyPlaying: boolean;
  onPlay: () => void;
  language: string;
}

export const StationCard = ({ station, isCurrentlyPlaying, onPlay, language }: StationCardProps) => {
  const stationName = station.translatedNames[language] || station.name;
  
  return (
    <button
      onClick={onPlay}
      className={`glass-hover rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all ${
        isCurrentlyPlaying ? "ring-2 ring-secondary" : ""
      }`}
    >
      <div className={`relative ${isCurrentlyPlaying ? "animate-pulse" : ""}`}>
        {station.favicon ? (
          <div className="w-16 h-16 rounded-full overflow-hidden bg-card">
            <img 
              src={station.favicon} 
              alt={stationName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-full h-full flex items-center justify-center">
              <Radio className="w-8 h-8 text-primary" />
            </div>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center">
            <Radio className="w-8 h-8 text-primary" />
          </div>
        )}
        {isCurrentlyPlaying && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="text-center">
        <h3 className={`font-semibold text-sm line-clamp-2 ${
          isCurrentlyPlaying ? "text-secondary" : ""
        }`}>
          {stationName}
        </h3>
      </div>
    </button>
  );
};
