import { useState } from 'react';
import { TextDisplay } from '@/components/TextDisplay';
import { KeyboardSlider } from '@/components/KeyboardSlider';
import { ControlButtons } from '@/components/ControlButtons';

const Index = () => {
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const [typedText, setTypedText] = useState('');
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isShiftActive, setIsShiftActive] = useState(false);

  const handleLetterSelect = (letter: string) => {
    setTypedText((prev) => prev + letter);
    
    if (isShiftActive) {
      setIsShiftActive(false);
    }

    setActiveRow(null);
  };

  const handleSpace = () => {
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
  };

  const handleSubmit = () => {
    console.log('Submitted:', typedText);
    // Add your submit logic here
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
        <TextDisplay typedText={typedText} />

        {/* Keyboard Area */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Keyboard Sliders */}
          <div className="space-y-8 mb-8">
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
        <div className="flex justify-center mt-8">
          <button
            onClick={handleReset}
            className="bg-background text-foreground px-6 py-2 rounded font-medium hover:bg-muted transition-colors border border-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
