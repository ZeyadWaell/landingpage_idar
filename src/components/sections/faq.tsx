"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";
import { useLanguage } from "@/i18n/language-provider";

export function Faq() {
  const { t } = useLanguage();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0040c1] dark:text-[#699aff]">
          {f.badge}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          {f.title}
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl space-y-3">
        {f.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-[#171717]/10 bg-white dark:border-white/10 dark:bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-[#0a0a0a] dark:text-white">
                  {item.question}
                </span>
                <motion.svg
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-5 w-5 shrink-0 text-[#0040c1] dark:text-[#699aff]"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#171717]/70 dark:text-[#eff4ff]/70">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
