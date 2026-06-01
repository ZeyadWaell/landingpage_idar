import { pricingTiers } from "@/data/pricing";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing" className="bg-[#eff4ff]/40 dark:bg-white/[0.02]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0040c1] dark:text-[#699aff]">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          Try for free and start{" "}
          <span className="text-[#0040c1] dark:text-[#699aff]">controlling your finances</span>
        </h2>
        <p className="mt-4 text-lg text-[#171717]/70 dark:text-[#eff4ff]/70">
          No hidden fees. Cancel anytime. Your data is always yours.
        </p>
      </Reveal>

      <RevealGroup
        as="ul"
        className="mt-16 grid gap-6 lg:grid-cols-3"
      >
        {pricingTiers.map((tier) => (
          <RevealItem
            as="li"
            key={tier.name}
            className={cn(
              "flex flex-col rounded-2xl border p-8 transition-shadow",
              tier.highlighted
                ? "relative border-[#0040c1] bg-white shadow-xl ring-2 ring-[#0040c1] lg:-mt-4 lg:mb-4 dark:bg-[#141414]"
                : "border-[#171717]/10 bg-white hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]",
            )}
          >
            {tier.badge && (
              <span
                className={cn(
                  "mb-4 w-fit rounded-full px-3 py-1 text-xs font-semibold",
                  tier.highlighted
                    ? "bg-[#0040c1] text-white"
                    : "bg-[#eff4ff] text-[#0040c1] dark:bg-[#0a0a0a]/40 dark:text-[#84a9f3]",
                )}
              >
                {tier.badge}
              </span>
            )}
            <h3 className="text-lg font-semibold text-[#0a0a0a] dark:text-white">
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-[#0a0a0a] dark:text-white">
                {tier.price}
              </span>
              <span className="text-sm text-[#171717]/50 dark:text-[#eff4ff]/50">
                /{tier.period}
              </span>
            </p>
            <p className="mt-4 text-sm text-[#171717]/70 dark:text-[#eff4ff]/70">
              {tier.description}
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-[#171717]/80 dark:text-[#eff4ff]/80"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0040c1] dark:text-[#699aff]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              variant={tier.highlighted ? "primary" : "secondary"}
              href="#"
            >
              {tier.cta}
            </Button>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
