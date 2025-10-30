import { useState, useRef, useEffect } from 'react';

interface KeyboardSliderProps {
  letters: string[];
  isActive: boolean;
  onActivate: () => void;
  onLetterSelect: (letter: string) => void;
  isShiftActive: boolean;
}

export const KeyboardSlider = ({
  letters,
  isActive,
  onActivate,
  onLetterSelect,
  isShiftActive,
}: KeyboardSliderProps) => {
  const [dotPosition, setDotPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [snappedIndex, setSnappedIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const SNAP_THRESHOLD = 25;

  const handleStartDotMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) {
      onActivate();
    }
    setIsDragging(true);
    setDotPosition(0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && isActive) {
      updateDotPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateDotPosition = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    
    const tickWidth = rect.width / (letters.length + 1);
    const tickPositions = letters.map((_, i) => (i + 1) * tickWidth);
    
    let newPosition = clampedX;
    let newSnappedIndex: number | null = null;

    for (let i = 0; i < tickPositions.length; i++) {
      const tickPos = tickPositions[i];
      if (Math.abs(clampedX - tickPos) < SNAP_THRESHOLD) {
        newPosition = tickPos;
        newSnappedIndex = i;
        break;
      }
    }

    setDotPosition(newPosition);
    setSnappedIndex(newSnappedIndex);
  };

  const handleConfirm = () => {
    if (snappedIndex !== null) {
      const letter = letters[snappedIndex];
      onLetterSelect(isShiftActive ? letter.toUpperCase() : letter.toLowerCase());
      setDotPosition(0);
      setSnappedIndex(null);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    if (!isActive) {
      setDotPosition(0);
      setSnappedIndex(null);
      setIsDragging(false);
    }
  }, [isActive]);

  return (
    <div className="relative w-full py-8">
      {/* Letter Preview */}
      {snappedIndex !== null && isActive && (
        <div
          className="absolute top-0 transform -translate-x-1/2 transition-all duration-150"
          style={{ left: `${dotPosition}px` }}
        >
          <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
            → {isShiftActive ? letters[snappedIndex].toUpperCase() : letters[snappedIndex].toLowerCase()}
          </div>
        </div>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className={`relative h-16 transition-all ${
          isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
        }`}
      >
        {/* Slider Line */}
        <div
          className={`absolute top-1/2 left-0 right-0 h-1 rounded-full transition-all ${
            isActive ? 'bg-slider-active shadow-lg shadow-primary/20' : 'bg-slider-inactive'
          }`}
        />

        {/* Tick Marks and Letters */}
        {letters.map((letter, index) => {
          const position = ((index + 1) / (letters.length + 1)) * 100;
          const isSnapped = snappedIndex === index && isActive;
          
          return (
            <div
              key={index}
              className="absolute top-0 transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              {/* Tick Mark */}
              <div
                className={`w-0.5 h-6 rounded-full transition-all ${
                  isSnapped
                    ? 'bg-slider-snapped h-8 shadow-lg shadow-primary/50'
                    : isActive
                    ? 'bg-tick'
                    : 'bg-slider-inactive'
                }`}
              />
              
              {/* Snap Zone Indicator */}
              {isActive && (
                <div
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-2 transition-all ${
                    isSnapped
                      ? 'border-slider-hover bg-slider-hover/20 scale-110'
                      : 'border-transparent'
                  }`}
                />
              )}

              {/* Letter */}
              <div
                className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-lg font-semibold transition-all ${
                  isSnapped
                    ? 'text-accent scale-125 font-bold'
                    : isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {isShiftActive ? letter.toUpperCase() : letter}
              </div>
            </div>
          );
        })}

        {/* Start Dot (always visible at left) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <div
            onMouseDown={handleStartDotMouseDown}
            className={`w-10 h-10 rounded-full cursor-grab active:cursor-grabbing transition-all ${
              isActive
                ? 'bg-primary border-4 border-primary-foreground shadow-xl shadow-primary/50 scale-110'
                : 'bg-secondary border-4 border-border hover:scale-110 hover:bg-primary hover:border-primary-foreground'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-primary-foreground">
              {isActive ? '▶' : 'START'}
            </div>
          </div>
          {!isActive && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
              Click to start
            </div>
          )}
        </div>

        {/* Draggable Dot (only when active and dragging) */}
        {isActive && isDragging && (
          <div
            className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all"
            style={{
              left: `${dotPosition}px`,
              transitionProperty: snappedIndex !== null ? 'all' : 'none',
              transitionDuration: '0.15s',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div
              className={`w-6 h-6 rounded-full bg-dot border-4 shadow-lg transition-all ${
                snappedIndex !== null
                  ? 'border-slider-snapped scale-125 shadow-primary/50'
                  : 'border-foreground'
              }`}
            />
          </div>
        )}
      </div>

      {/* Confirm Button (appears when letter is selected) */}
      {snappedIndex !== null && isActive && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleConfirm}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50"
          >
            ENTER
          </button>
        </div>
      )}
    </div>
  );
};
