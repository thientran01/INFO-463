interface ControlButtonsProps {
  onSpace: () => void;
  onDelete: () => void;
  onShift: () => void;
  onSubmit: () => void;
  isShiftActive: boolean;
}

export const ControlButtons = ({
  onSpace,
  onDelete,
  onShift,
  onSubmit,
  isShiftActive,
}: ControlButtonsProps) => {
  return (
    <>
      {/* Delete - Top Right */}
      <div className="absolute top-8 right-8">
        <button
          onClick={onDelete}
          className="bg-foreground text-background px-6 py-3 rounded font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          DELETE
        </button>
      </div>

      {/* Submit Enter - Middle Right */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
        <button
          onClick={onSubmit}
          className="bg-foreground text-background px-8 py-4 rounded font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          ENTER
        </button>
      </div>

      {/* Shift - Bottom Left */}
      <div className="absolute bottom-8 left-8">
        <button
          onClick={onShift}
          className={`px-6 py-3 rounded font-medium transition-colors border ${
            isShiftActive
              ? 'bg-foreground text-background border-foreground'
              : 'bg-background text-foreground border-foreground hover:bg-muted'
          }`}
        >
          SHIFT {isShiftActive && '✓'}
        </button>
      </div>

      {/* Space Bar - Bottom Middle */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={onSpace}
          className="bg-background text-foreground px-32 py-4 rounded font-medium hover:bg-muted transition-colors border border-foreground"
        >
          SPACE
        </button>
      </div>
    </>
  );
};
