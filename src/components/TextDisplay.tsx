interface TextDisplayProps {
  typedText: string;
  targetText: string;
}

export const TextDisplay = ({ typedText, targetText }: TextDisplayProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mb-8">
      {/* Target Text */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
          Target Phrase
        </div>
        <div className="text-2xl font-semibold text-foreground tracking-wide">
          {targetText.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-colors ${
                i < typedText.length
                  ? typedText[i] === char
                    ? 'text-success'
                    : 'text-destructive'
                  : i === typedText.length
                  ? 'text-accent'
                  : 'text-muted-foreground'
              }`}
            >
              {char === ' ' ? '␣' : char}
            </span>
          ))}
        </div>
      </div>

      {/* Typed Text Display */}
      <div className="bg-card rounded-xl p-6 border-2 border-border">
        <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
          Your Input
        </div>
        <div className="min-h-[60px] text-3xl font-mono text-foreground tracking-wide break-all">
          {typedText || (
            <span className="text-muted-foreground italic">Start typing...</span>
          )}
          <span className="inline-block w-1 h-8 bg-primary ml-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
