import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";

export function Cta() {
  return (
    <Section className="pb-24">
      <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0040c1] to-[#173edd] px-8 py-16 text-center sm:px-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_55%)]"
          aria-hidden
        />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your first step toward financial freedom begins here
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-[#eff4ff]/90">
          Join over a million people who track, save, and grow their money with
          Finovo. It&apos;s free to start—no credit card needed.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            href="#pricing"
            className="bg-white text-[#0040c1] hover:bg-[#eff4ff] focus-visible:outline-white"
          >
            Get started free
          </Button>
          <Button
            size="lg"
            variant="ghost"
            href="#"
            className="text-white hover:bg-white/10 focus-visible:outline-white"
          >
            Book a demo
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
