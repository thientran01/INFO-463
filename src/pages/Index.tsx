import { useState } from 'react';
import { TextDisplay } from '@/components/TextDisplay';
import { KeyboardSlider } from '@/components/KeyboardSlider';

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
    <div className="h-screen bg-background flex flex-col py-4 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col flex-1 min-h-0">
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
        <div className="mb-4">
          <TextDisplay typedText={typedText} />
        </div>

        {/* Keyboard Area - Centered and Compact */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className="w-full max-w-5xl mx-auto">
            {/* Keyboard with side buttons */}
            <div className="flex gap-4 items-center mb-6">
              <div className="flex-1 space-y-4">
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
              
              {/* Right side buttons */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-foreground text-background px-6 py-3 rounded font-medium hover:bg-muted-foreground transition-colors border border-foreground whitespace-nowrap"
                >
                  DELETE
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-foreground text-background px-8 py-4 rounded font-medium hover:bg-muted-foreground transition-colors border border-foreground whitespace-nowrap"
                >
                  ENTER
                </button>
              </div>
            </div>

            {/* Bottom Row - Shift and Space */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleShift}
                className={`px-6 py-3 rounded font-medium transition-colors border ${
                  isShiftActive
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-background text-foreground border-foreground hover:bg-muted'
                }`}
              >
                SHIFT {isShiftActive && '✓'}
              </button>

              <button
                onClick={handleSpace}
                className="bg-background text-foreground px-32 py-4 rounded font-medium hover:bg-muted transition-colors border border-foreground flex-shrink-0"
              >
                SPACE
              </button>

              {/* Empty div for spacing balance */}
              <div className="w-[88px]"></div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-4">
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
