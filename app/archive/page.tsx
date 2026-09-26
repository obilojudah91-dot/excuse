import Navigation from "@/components/Navigation";
import ArchiveComponent from "@/components/Archive";

export const metadata = {
  title: "Archive — EXCUSE™",
};

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <ArchiveComponent />
    </main>
  );
}
