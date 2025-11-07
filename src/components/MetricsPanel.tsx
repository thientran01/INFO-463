import { useEffect, useState } from 'react';

interface MetricsPanelProps {
  startTime: number | null;
  typedText: string;
  targetText: string;
  totalDragDistance: number;
}

export const MetricsPanel = ({
  startTime,
  typedText,
  targetText,
  totalDragDistance,
}: MetricsPanelProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  const calculateAccuracy = () => {
    if (typedText.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < Math.min(typedText.length, targetText.length); i++) {
      if (typedText[i] === targetText[i]) correct++;
    }
    return Math.round((correct / typedText.length) * 100);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const deciseconds = Math.floor((ms % 1000) / 100);
    return `${seconds}.${deciseconds}s`;
  };

  const averageTimePerChar =
    typedText.length > 0 ? elapsedTime / typedText.length : 0;

  const isComplete = typedText === targetText;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-card rounded p-6 border border-border">
        <h3 className="text-lg font-medium mb-4 text-foreground">Metrics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Time</div>
            <div className="text-2xl font-mono text-foreground">
              {formatTime(elapsedTime)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Characters</div>
            <div className="text-2xl font-mono text-foreground">
              {typedText.length}/{targetText.length}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Avg Time/Char</div>
            <div className="text-2xl font-mono text-foreground">
              {formatTime(averageTimePerChar)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
            <div className="text-2xl font-mono text-foreground">
              {calculateAccuracy()}%
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border text-center">
          <div className="text-sm text-muted-foreground mb-1">
            Total Drag Distance
          </div>
          <div className="text-xl font-mono text-foreground">
            {Math.round(totalDragDistance)}px
          </div>
        </div>

        {isComplete && (
          <div className="mt-6 p-4 bg-muted border border-border rounded text-center">
            <div className="text-xl font-medium text-foreground mb-2">
              Complete!
            </div>
            <div className="text-sm text-foreground">
              You typed "{targetText}" in {formatTime(elapsedTime)} with{' '}
              {calculateAccuracy()}% accuracy
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
