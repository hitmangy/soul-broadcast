import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimerOff } from "lucide-react";

interface TimerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetTimer: (minutes: number | null) => void;
}

const timerOptions = [
  { label: "15 minutes", minutes: 15 },
  { label: "30 minutes", minutes: 30 },
  { label: "45 minutes", minutes: 45 },
  { label: "1 hour", minutes: 60 },
  { label: "2 hours", minutes: 120 },
  { label: "3 hours", minutes: 180 },
  { label: "4 hours", minutes: 240 },
  { label: "5 hours", minutes: 300 },
];

export const TimerDialog = ({ open, onOpenChange, onSetTimer }: TimerDialogProps) => {
  const handleSetTimer = (minutes: number | null) => {
    onSetTimer(minutes);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/20">
        <DialogHeader>
          <DialogTitle>Set Sleep Timer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2">
          <button
            onClick={() => handleSetTimer(null)}
            className="w-full glass-hover rounded-xl p-4 flex items-center gap-3 text-left"
          >
            <TimerOff className="w-5 h-5 text-destructive" />
            <span className="font-medium">Turn Off Timer</span>
          </button>

          {timerOptions.map((option) => (
            <button
              key={option.minutes}
              onClick={() => handleSetTimer(option.minutes)}
              className="w-full glass-hover rounded-xl p-4 text-left hover:bg-white/5"
            >
              {option.label}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
