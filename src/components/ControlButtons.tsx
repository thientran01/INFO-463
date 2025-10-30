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
          className={`px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg ${
            isShiftActive
              ? 'bg-success text-success-foreground shadow-success/50'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          SHIFT {isShiftActive && '✓'}
        </button>

        <button
          onClick={onDelete}
          className="bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-destructive/50"
        >
          DELETE
        </button>
      </div>

      {/* Space Bar - Wide */}
      <button
        onClick={onSpace}
        className="bg-secondary text-secondary-foreground px-32 py-4 rounded-lg font-semibold hover:scale-105 hover:bg-secondary/80 transition-all shadow-lg"
      >
        SPACE
      </button>
    </div>
  );
};
