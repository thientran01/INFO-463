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
    <div className="relative w-full">
      {/* Top Row - Delete */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onDelete}
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          DELETE
        </button>
      </div>

      {/* Middle Row - Enter on Right */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onSubmit}
          className="bg-foreground text-background px-6 py-2.5 rounded text-sm font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          ENTER
        </button>
      </div>

      {/* Bottom Row - Shift Left, Space Center */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onShift}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors border ${
            isShiftActive
              ? 'bg-foreground text-background border-foreground'
              : 'bg-background text-foreground border-foreground hover:bg-muted'
          }`}
        >
          SHIFT {isShiftActive && '✓'}
        </button>

        <button
          onClick={onSpace}
          className="bg-background text-foreground px-24 py-2.5 rounded text-sm font-medium hover:bg-muted transition-colors border border-foreground flex-shrink-0"
        >
          SPACE
        </button>

        {/* Empty div for spacing balance */}
        <div className="w-[72px]"></div>
      </div>
    </div>
  );
};
