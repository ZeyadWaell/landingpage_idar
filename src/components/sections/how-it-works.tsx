import { steps } from "@/data/steps";
import { Icon } from "@/components/icons";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-[#eff4ff]/40 dark:bg-white/[0.02]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0040c1] dark:text-[#699aff]">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          How Finovo <span className="text-[#0040c1] dark:text-[#699aff]">can help you</span>
        </h2>
        <p className="mt-4 text-lg text-[#171717]/70 dark:text-[#eff4ff]/70">
          From scattered accounts to total clarity in under five minutes.
        </p>
      </Reveal>

      <RevealGroup
        as="ol"
        className="mt-16 grid gap-8 lg:grid-cols-3"
      >
        {steps.map((item, index) => (
          <RevealItem as="li" key={item.step} className="relative">
            {index < steps.length - 1 && (
              <span
                className="absolute left-[3.25rem] top-7 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-[#84a9f3] to-transparent lg:block dark:from-[#0040c1]"
                aria-hidden
              />
            )}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#171717]/10 bg-white text-[#0040c1] shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-[#699aff]">
              <Icon name={item.icon} className="h-6 w-6" />
            </div>
            <span className="mt-5 block font-mono text-sm font-medium text-[#0040c1] dark:text-[#699aff]">
              {item.step}
            </span>
            <h3 className="mt-1 text-xl font-semibold text-[#0a0a0a] dark:text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#171717]/70 dark:text-[#eff4ff]/70">
              {item.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
