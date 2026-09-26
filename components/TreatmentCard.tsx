interface TreatmentCardProps {
  treatment: string;
  relapseProbability: number;
}

export default function TreatmentCard({
  treatment,
  relapseProbability,
}: TreatmentCardProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
      <div>
        <h3 className="mb-3 font-mono text-[11px] tracking-[0.12em] text-lime">
          RECOMMENDED TREATMENT
        </h3>
        <p className="font-display text-lg italic leading-snug text-ivory sm:text-xl">
          {treatment}
        </p>
      </div>

      <div className="flex flex-row items-center gap-3 border-t hairline pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
        <span className="font-mono text-[10px] tracking-[0.1em] text-ivory/45">
          RELAPSE PROBABILITY
        </span>
        <span className="font-display text-2xl text-tangerine">
          {relapseProbability}%
        </span>
      </div>
    </div>
  );
}
