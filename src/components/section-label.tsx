type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
};

export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-fg-faint">{index}</span>
      <span className="h-px w-8 bg-line-strong" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
