import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";
import { Phone, ExpenseScreen } from "@/components/ui/phone";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#d1e0ff] px-3.5 py-1.5 text-sm font-medium text-[#0040c1] dark:border-[#173edd]/40 dark:text-[#84a9f3]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0040c1] dark:bg-[#699aff]" />
      {children}
    </span>
  );
}

/* Decorative card that floats inside the first bento tile */
function PayCard() {
  return (
    <div className="relative mx-auto mt-8 w-[78%] rotate-[-4deg] rounded-2xl bg-gradient-to-br from-[#0040c1] to-[#2970ff] p-5 text-white shadow-[7px_10px_40px_0px_rgba(0,64,193,0.25)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/70">Balance</span>
        <span className="h-6 w-9 rounded bg-white/20" />
      </div>
      <p className="mt-4 font-mono text-lg tracking-widest">5412 7512 3456 0000</p>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-sm font-semibold">$48,250.00</span>
        <span className="text-xs text-white/70">12/28</span>
      </div>
    </div>
  );
}

/* Stacked mini cards for the savings tile */
function SavingsStack() {
  const rows = [
    { label: "New car", pct: 82, w: "100%" },
    { label: "Emergency fund", pct: 64, w: "88%" },
    { label: "Vacation", pct: 40, w: "72%" },
  ];
  return (
    <div className="mt-6 space-y-3">
      {rows.map((r) => (
        <div
          key={r.label}
          className="rounded-xl border border-[#171717]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
          style={{ width: r.w }}
        >
          <div className="flex justify-between text-xs text-[#171717]/70 dark:text-[#eff4ff]/70">
            <span>{r.label}</span>
            <span className="font-medium text-[#0040c1] dark:text-[#84a9f3]">
              {r.pct}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#eff4ff] dark:bg-white/10">
            <div
              className="h-full rounded-full bg-[#0040c1]"
              style={{ width: `${r.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Analytics phone screen */
function AnalyticsScreen() {
  const bars = [45, 70, 55, 85, 60, 95, 75];
  return (
    <div className="mt-6 rotate-[10deg]">
      <div className="mx-auto w-[200px] rounded-[28px] border-[6px] border-[#0a0a0a] bg-white p-3 shadow-2xl dark:bg-[#141414]">
        <p className="text-[10px] font-medium text-[#171717]/50 dark:text-[#eff4ff]/50">
          Spending analytics
        </p>
        <p className="mt-1 text-lg font-bold text-[#0a0a0a] dark:text-white">
          $3,128
        </p>
        <div className="mt-4 flex h-20 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-[#0040c1]/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <Section id="features">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Tag>Key Features</Tag>
        </div>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          Explore our <span className="text-[#0040c1] dark:text-[#699aff]">standout features</span>
        </h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Tile 1 — Expense & Income Tracking */}
        <RevealItem className="overflow-hidden rounded-3xl border border-[#171717]/10 bg-[#f5faff] p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <PayCard />
          <h3 className="mt-10 text-xl font-semibold text-[#0a0a0a] dark:text-white">
            Expense &amp; income tracking
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#171717]/70 dark:text-[#eff4ff]/70">
            Record and categorize every expense and income—automatically or by
            hand—so nothing slips through the cracks.
          </p>
        </RevealItem>

        {/* Tile 2 — Smart Savings Goals */}
        <RevealItem className="overflow-hidden rounded-3xl border border-[#171717]/10 bg-[#f5faff] p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <SavingsStack />
          <h3 className="mt-10 text-xl font-semibold text-[#0a0a0a] dark:text-white">
            Smart savings goals
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#171717]/70 dark:text-[#eff4ff]/70">
            Set specific savings targets and watch your progress climb toward
            every milestone.
          </p>
        </RevealItem>

        {/* Tile 3 — Financial Analytics (wide) */}
        <RevealItem className="overflow-hidden rounded-3xl border border-[#171717]/10 bg-[#f5faff] p-8 lg:col-span-1 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-[#0a0a0a] dark:text-white">
                Financial analytics
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#171717]/70 dark:text-[#eff4ff]/70">
                Generate reports and visualizations to analyze your spending
                habits at a glance.
              </p>
            </div>
            <div className="hidden sm:block">
              <AnalyticsScreen />
            </div>
          </div>
          <div className="sm:hidden">
            <AnalyticsScreen />
          </div>
        </RevealItem>

        {/* Tile 4 — Get the app (brand) */}
        <RevealItem className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0040c1] to-[#2970ff] p-8 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.4)_1px,transparent_0)] [background-size:22px_22px]"
            aria-hidden
          />
          <div className="relative flex h-full items-end justify-between gap-4">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 18l4-5 3 3 7-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="mt-10">
                <h3 className="text-2xl font-semibold">Get the app</h3>
                <p className="mt-2 max-w-[16rem] text-sm text-[#eff4ff]/80">
                  Everything you need to manage your money, right in your pocket.
                </p>
                <span className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0040c1]">
                  Download free
                </span>
              </div>
            </div>
            <div className="-mb-16 hidden translate-y-6 sm:block">
              <Phone className="w-[180px] rotate-[8deg]">
                <ExpenseScreen />
              </Phone>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
