import { Marquee } from "@/components/ui/Marquee";
import { VALUE_WORDS } from "@/lib/site";

export function ValueMarquee() {
  return (
    <section aria-label="Prize categories" className="border-y border-white/[0.06] py-8">
      <Marquee duration={55}>
        {VALUE_WORDS.map((word) => (
          <span key={word} className="flex items-center">
            <span className="font-display select-none whitespace-nowrap text-3xl font-semibold tracking-tight text-paper/[0.08] sm:text-5xl">
              {word}
            </span>
            <span className="mx-7 text-electric/30 sm:mx-10">•</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
