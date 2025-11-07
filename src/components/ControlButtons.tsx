interface ControlButtonsProps {
  onSpace: () => void;
  onDelete: () => void;
  onShift: () => void;
  isShiftActive: boolean;
}

export const ControlButtons = ({
  onSpace,
  onDelete,
  onShift,
  isShiftActive,
}: ControlButtonsProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Shift and Delete in a row */}
      <div className="flex gap-4">
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

        <button
          onClick={onDelete}
          className="bg-foreground text-background px-6 py-3 rounded font-medium hover:bg-muted-foreground transition-colors border border-foreground"
        >
          DELETE
        </button>
      </div>

      {/* Space Bar - Wide */}
      <button
        onClick={onSpace}
        className="bg-background text-foreground px-32 py-4 rounded font-medium hover:bg-muted transition-colors border border-foreground"
      >
        SPACE
      </button>
    </div>
  );
};
