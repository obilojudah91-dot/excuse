interface MicrocopyProps {
  text: string;
  tone?: "cyan" | "graphite" | "tangerine";
  className?: string;
}

const TONE_MAP = {
  cyan: "text-cyan border-cyan/30",
  graphite: "text-ivory/50 border-ivory/20",
  tangerine: "text-tangerine border-tangerine/30",
};

export default function Microcopy({
  text,
  tone = "graphite",
  className = "",
}: MicrocopyProps) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.08em] ${TONE_MAP[tone]} ${className}`}
    >
      {text}
    </span>
  );
}
