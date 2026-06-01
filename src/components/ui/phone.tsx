import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* iPhone-style frame with notch + status bar — original CSS/SVG */
export function Phone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[270px] overflow-hidden rounded-[2.75rem] border-[10px] border-[#0a0a0a] bg-white shadow-2xl",
        className,
      )}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#0a0a0a]" />
      {children}
      {/* home indicator */}
      <div className="absolute bottom-2 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-[#0a0a0a]/70" />
    </div>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "text-white" : "text-[#0a0a0a]";
  return (
    <div className={cn("flex items-center justify-between px-6 pt-4 text-[11px] font-semibold", c)}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M2 17h2v3H2zm4-3h2v6H6zm4-4h2v10h-2zm4-4h2v14h-2z" /></svg>
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 4C7 4 3 7 1 11l11 9 11-9c-2-4-6-7-11-7z" opacity=".9" /></svg>
        <span className="ml-0.5 h-2.5 w-5 rounded-[3px] border border-current"><span className="block h-full w-3/4 rounded-[1px] bg-current" /></span>
      </span>
    </div>
  );
}

/* Card dashboard screen — "Good morning, James Lee" */
export function CardDashboardScreen() {
  return (
    <div className="bg-[#eef2ff] pb-6">
      <StatusBar />
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#6b7280]">Good morning,</p>
            <p className="text-xl font-bold text-[#0a0a0a]">James Lee</p>
          </div>
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-[#94a3b8] to-[#475569]" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex rounded-lg bg-white p-0.5 text-xs font-semibold shadow-sm">
            <span className="rounded-md bg-[#0040c1] px-2.5 py-1 text-white">USD</span>
            <span className="px-2.5 py-1 text-[#0a0a0a]">IDR</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#0040c1]">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
            Add Currency
          </span>
        </div>

        {/* card */}
        <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1a4f] to-[#0040c1] p-4 text-white shadow-lg">
          <div className="absolute -right-6 top-0 h-full w-2/3 skew-x-[-18deg] bg-white/10" />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 18l4-5 3 3 7-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Finovo Card
            </span>
            <span className="h-4 w-7 rounded-full bg-white/25" />
          </div>
          <p className="relative mt-6 text-2xl font-bold">$2,736.15</p>
          <p className="relative mt-1 font-mono text-sm tracking-widest text-white/80">•••• 5318</p>
        </div>

        {/* actions */}
        <div className="mt-5 flex justify-between px-2">
          {[
            { l: "Top-up", d: "M12 5v14M5 12l7 7 7-7" },
            { l: "Withdraw", d: "M5 9h14v10H5zM9 5h6v4H9z" },
            { l: "Transfer", d: "M7 7h11l-3-3M17 17H6l3 3" },
          ].map((a) => (
            <div key={a.l} className="flex flex-col items-center gap-1.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0040c1]/20 text-[#0040c1]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d={a.d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="text-[11px] font-medium text-[#0a0a0a]">{a.l}</span>
            </div>
          ))}
        </div>

        {/* transactions */}
        <div className="mt-5 rounded-t-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#0a0a0a]">Transactions</p>
            <span className="text-xs font-semibold text-[#0040c1]">See all</span>
          </div>
          {[
            { n: "Apple Store", s: "iPhone 12 Case", a: "-$120.90", up: false },
            { n: "Ilya Vasil", s: "Finpay", a: "+$50.00", up: true },
          ].map((t) => (
            <div key={t.n} className="mt-3 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-[#0a0a0a]" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#0a0a0a]">{t.n}</p>
                <p className="text-[10px] text-[#9ca3af]">{t.s}</p>
              </div>
              <span className={cn("text-xs font-bold", t.up ? "text-emerald-500" : "text-[#0a0a0a]")}>{t.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Expense entry screen — "$75.00" */
export function ExpenseScreen() {
  return (
    <div className="bg-white pb-6">
      <div className="bg-[#3b54e8] pb-10">
        <StatusBar light />
        <div className="relative mt-3 flex items-center justify-center px-6">
          <svg className="absolute left-6 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-lg font-bold text-white">Expense</span>
        </div>
        <p className="mt-6 text-center text-sm text-white/70">How much?</p>
        <p className="mt-1 text-center text-4xl font-extrabold text-white">$75,00</p>
      </div>

      <div className="-mt-5 rounded-t-3xl bg-white px-5 pt-6">
        {["Category", "Wallet"].map((f, i) => (
          <div key={f} className={cn("flex items-center justify-between rounded-2xl border border-[#e5e7eb] px-4 py-3.5 text-sm text-[#9ca3af]", i > 0 && "mt-4")}>
            {f}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        ))}
        <div className="mt-4 flex h-20 items-start rounded-2xl border border-[#e5e7eb] px-4 py-3.5 text-sm text-[#9ca3af]">
          Description
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#cbd5e1] px-4 py-3.5 text-sm text-[#9ca3af]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M21 12l-9 9a4 4 0 01-6-6l9-9a3 3 0 014 4l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Add Attachment
        </div>
        <button type="button" className="mt-6 w-full rounded-2xl bg-[#3b54e8] py-3.5 text-sm font-semibold text-white">
          Continue
        </button>
      </div>
    </div>
  );
}
