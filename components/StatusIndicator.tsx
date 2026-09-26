export default function StatusIndicator() {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-ivory/70">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-lime" />
      </span>
      SYSTEM STATUS <span className="text-lime">● ONLINE</span>
    </div>
  );
}
