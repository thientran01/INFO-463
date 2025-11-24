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
      {/* Top Row - Delete and Submit aligned */}
      <div className="flex justify-end items-center gap-2 mb-2">
        <button
          onClick={onDelete}
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          DELETE
        </button>
        <button
          onClick={onSubmit}
          className="bg-foreground text-background px-6 py-2 rounded text-sm font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          SUBMIT
        </button>
      </div>

      {/* Bottom Row - Shift and Space aligned */}
      <div className="flex items-center gap-2">
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
          className="bg-background text-foreground flex-1 py-2 rounded text-sm font-medium hover:bg-muted transition-colors border border-foreground"
        >
          SPACE
        </button>
      </div>
    </div>
  );
};
