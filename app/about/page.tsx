import Navigation from "@/components/Navigation";
import Microcopy from "@/components/Microcopy";

export const metadata = {
  title: "About — EXCUSE™",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
        <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-cyan">
          DEPARTMENT CHARTER
        </p>
        <h1 className="font-display text-4xl italic text-ivory sm:text-5xl">
          About the department
        </h1>

        <div className="mt-8 space-y-6 font-sans text-[15px] leading-relaxed text-ivory/75 sm:text-base">
          <p>
            EXCUSE™ is a completely unnecessary investigation department. You
            bring us the reason you didn&rsquo;t do the thing, and we bring
            back a diagnosis with a name, a severity score, and a treatment
            plan you will probably ignore.
          </p>
          <p>
            Nothing here is real. There is no doctor, no lab, no peer review,
            and no qualification of any kind behind any of it. The whole
            analysis happens on your device, instantly, using a set of rules
            written by people who have also, at some point, reorganized their
            desktop instead of starting the actual work.
          </p>
          <p>
            Cases are stored only in your browser&rsquo;s local storage. We
            don&rsquo;t have a server, an account system, or any interest in
            your data &mdash; we&rsquo;re not qualified to hold onto it
            responsibly.
          </p>
          <p>
            If a diagnosis lands a little too close to home, that&rsquo;s not
            evidence of accuracy. That&rsquo;s just what excuses tend to have
            in common.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <Microcopy text="Not a real medical department" tone="tangerine" />
          <Microcopy text="Peer review: unavailable" tone="graphite" />
          <Microcopy text="Established out of spite" tone="cyan" />
        </div>
      </div>
    </main>
  );
}
