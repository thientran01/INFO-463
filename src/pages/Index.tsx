import { useState } from 'react';
import { TextDisplay } from '@/components/TextDisplay';
import { KeyboardSlider } from '@/components/KeyboardSlider';
import { ControlButtons } from '@/components/ControlButtons';
import { MetricsPanel } from '@/components/MetricsPanel';

const Index = () => {
  const TARGET_TEXT = 'THE QUICK BROWN FOX';
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const [typedText, setTypedText] = useState('');
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalDragDistance, setTotalDragDistance] = useState(0);

  const handleLetterSelect = (letter: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText((prev) => prev + letter);
    
    if (isShiftActive) {
      setIsShiftActive(false);
    }

    setActiveRow(null);
  };

  const handleSpace = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setTypedText((prev) => prev + ' ');
  };

  const handleDelete = () => {
    setTypedText((prev) => prev.slice(0, -1));
  };

  const handleShift = () => {
    setIsShiftActive((prev) => !prev);
  };

  const handleReset = () => {
    setTypedText('');
    setActiveRow(null);
    setIsShiftActive(false);
    setStartTime(null);
    setTotalDragDistance(0);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sliding Text Entry Keyboard
          </h1>
          <p className="text-muted-foreground">
            Drag the dot along the slider to select letters, then click ENTER to confirm
          </p>
        </div>

        {/* Text Display */}
        <TextDisplay typedText={typedText} targetText={TARGET_TEXT} />

        {/* Keyboard Sliders */}
        <div className="w-full max-w-4xl mx-auto space-y-8 mb-8">
          {KEYBOARD_ROWS.map((letters, index) => (
            <KeyboardSlider
              key={index}
              letters={letters}
              isActive={activeRow === index}
              onActivate={() => setActiveRow(index)}
              onLetterSelect={handleLetterSelect}
              isShiftActive={isShiftActive}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="mb-8">
          <ControlButtons
            onSpace={handleSpace}
            onDelete={handleDelete}
            onShift={handleShift}
            isShiftActive={isShiftActive}
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleReset}
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-secondary/80 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Metrics Panel */}
        <MetricsPanel
          startTime={startTime}
          typedText={typedText}
          targetText={TARGET_TEXT}
          totalDragDistance={totalDragDistance}
        />
      </div>
    </div>
  );
};

export default Index;
