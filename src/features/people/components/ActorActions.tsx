import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Share2 } from "lucide-react";

interface ActorActionsProps {
  name: string;
}

const ActorActions = memo(function ActorActions({ name }: ActorActionsProps) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // user cancelled or clipboard failure
    }
  }, [name]);

  const handleFilmography = useCallback(() => {
    const section = document.querySelector("[data-credits-section]");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={handleFilmography}
        size="lg"
        className="bg-[var(--netflix-red)] hover:bg-[var(--netflix-red-hover)] text-white font-semibold shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-200"
      >
        <BookOpen className="w-5 h-5" />
        View Filmography
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        size="lg"
        className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200"
      >
        <Share2 className="w-5 h-5" />
        Share Profile
      </Button>
    </div>
  );
});

export default ActorActions;
