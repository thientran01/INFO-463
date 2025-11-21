import { useState } from 'react';
import { TextDisplay } from '@/components/TextDisplay';
import { KeyboardSlider } from '@/components/KeyboardSlider';
import { ControlButtons } from '@/components/ControlButtons';
import { MetricsPanel } from '@/components/MetricsPanel';

const Index = () => {
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const TARGET_TEXT = "The quick brown fox jumps over the lazy dog";
  const [typedText, setTypedText] = useState('');
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalDragDistance, setTotalDragDistance] = useState(0);
  const [lastDragPosition, setLastDragPosition] = useState(0);

  const handleLetterSelect = (letter: string, dragDistance?: number) => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
    
    if (dragDistance !== undefined) {
      setTotalDragDistance(prev => prev + dragDistance);
    }
    
    setTypedText((prev) => prev + letter);
    
    if (isShiftActive) {
      setIsShiftActive(false);
    }

    setActiveRow(null);
  };

  const handleSpace = () => {
    if (startTime === null) {
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
    setLastDragPosition(0);
  };

  const handleSubmit = () => {
    console.log('Submitted:', typedText);
    // Add your submit logic here
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Sliding Text Entry Keyboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Drag the dot along the slider to select letters, then click ENTER to confirm
          </p>
        </div>

        {/* Text Display */}
        <TextDisplay typedText={typedText} />

        {/* Metrics Panel */}
        <MetricsPanel
          startTime={startTime}
          typedText={typedText}
          targetText={TARGET_TEXT}
          totalDragDistance={totalDragDistance}
        />

        {/* Keyboard Area */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Keyboard Sliders */}
          <div className="space-y-4 mb-4">
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
          <ControlButtons
            onSpace={handleSpace}
            onDelete={handleDelete}
            onShift={handleShift}
            onSubmit={handleSubmit}
            isShiftActive={isShiftActive}
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleReset}
            className="bg-background text-foreground px-4 py-1.5 rounded font-medium text-sm hover:bg-muted transition-colors border border-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
