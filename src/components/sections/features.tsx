"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { useLanguage } from "@/i18n/language-provider";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#dce7ff] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0040c1] shadow-sm">
      {children}
      <span className="h-1.5 w-1.5 rounded-full bg-[#0040c1]" />
    </span>
  );
}

function NumberBadge({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={[
        "absolute start-5 top-5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold shadow-sm",
        active
          ? "border-white/25 bg-white/15 text-white"
          : "border-[#dce7ff] bg-[#f4f8ff] text-[#0040c1]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function FeatureCard({
  index,
  title,
  description,
  children,
  blue = false,
  tallVisual = false,
}: {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
  blue?: boolean;
  tallVisual?: boolean;
}) {
  return (
    <RevealItem
      className={[
        "relative overflow-hidden rounded-[18px] border p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(0,64,193,0.12)] sm:p-6",
        blue
          ? "border-[#0057d8] bg-gradient-to-br from-[#0067ff] via-[#0052d8] to-[#0039aa] text-white"
          : "border-[#dce4f2] bg-gradient-to-br from-white to-[#f8fbff] text-[#0a0a0a]",
      ].join(" ")}
    >
      <NumberBadge active={blue}>{index}</NumberBadge>
      <div className={tallVisual ? "min-h-[260px] sm:min-h-[280px]" : "min-h-[210px] sm:min-h-[230px]"}>{children}</div>
      <h3 className={["mt-4 text-xl font-bold tracking-tight", blue ? "text-white" : "text-[#0a0a0a]"].join(" ")}>
        {title}
      </h3>
      <p className={["mt-2 text-sm leading-relaxed", blue ? "text-white/82" : "text-[#334155]"].join(" ")}>
        {description}
      </p>
    </RevealItem>
  );
}

function IconBox({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={[
        "flex h-9 w-9 items-center justify-center rounded-lg border",
        active
          ? "border-[#0040c1] bg-[#0040c1] text-white"
          : "border-[#e5edfb] bg-white text-[#64748b]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function CalendarVisual() {
  const { t } = useLanguage();
  const c = t.features.calendar;
  const days = Array.from({ length: 35 }, (_, i) => (i === 0 || i > 30 ? null : i));
  const bookingStyles = [
    { gridColumn: "4 / span 3", gridRow: "3", className: "bg-[#dce8ff] text-[#0040c1]" },
    { gridColumn: "3 / span 3", gridRow: "4", className: "bg-[#ddf8e9] text-[#16834a]" },
    { gridColumn: "4 / span 3", gridRow: "5", className: "bg-[#fff0c7] text-[#9a6a00]" },
    { gridColumn: "1 / span 4", gridRow: "6", className: "bg-[#e7ddff] text-[#5a37c7]" },
  ];
  const bookings = c.bookings.map((label, i) => ({ label, ...bookingStyles[i] }));

  return (
    <div className="flex h-[200px] items-start justify-center pt-1 sm:pt-2">
      <div className="flex w-[80%] max-w-[300px] rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.1)]">
        <div className="flex w-10 flex-col items-center gap-3 rounded-s-2xl bg-[#f8fbff] py-4">
          <IconBox>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 2v4M16 2v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </IconBox>
          <IconBox active>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 11h10M7 15h6M5 4h14v16H5V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBox>
          <IconBox>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </IconBox>
        </div>
        <div className="relative flex-1 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#0f172a]">{c.month}</span>
            <span className="rounded-full bg-[#f1f5f9] px-1.5 py-0.5 text-[7px] font-bold text-[#334155]">{c.today}</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[7px] font-semibold text-[#94a3b8]">
            {c.weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="relative mt-1.5 grid grid-cols-7 grid-rows-5 gap-x-1.5 gap-y-0.5 text-center text-[7px] text-[#475569]">
            {days.map((day, index) => (
              <span key={`${day ?? "empty"}-${index}`} className="flex h-5 items-center justify-center">
                {day}
              </span>
            ))}
            {bookings.map((booking) => (
              <span
                key={booking.label}
                className={`z-10 self-center rounded px-1.5 py-0.5 text-center text-[6px] font-bold shadow-sm ${booking.className}`}
                style={{ gridColumn: booking.gridColumn, gridRow: booking.gridRow }}
              >
                {booking.label}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden w-[68px] space-y-2 border-s border-[#eef2f7] p-2 sm:block">
          <Metric label={c.metrics.occupancy} value={c.values.occupancy} ring />
          <Metric label={c.metrics.bookings} value={c.values.bookings} />
          <Metric label={c.metrics.revenue} value={c.values.revenue} />
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, ring = false }: { label: string; value: string; ring?: boolean }) {
  return (
    <div className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-[#edf2fb]">
      <span className="text-[7px] font-semibold text-[#94a3b8]">{label}</span>
      <div className="mt-0.5 flex items-center justify-between">
        <strong className="text-[10px] text-[#0f172a]">{value}</strong>
        {ring ? (
          <span className="h-5 w-5 rounded-full border-[4px] border-[#0040c1] border-l-[#dbeafe]" />
        ) : null}
      </div>
    </div>
  );
}

function GuestVisual() {
  const { t } = useLanguage();
  const g = t.features.guest;
  const fields = [g.fields.checkIn, g.fields.checkOut, g.fields.room, g.fields.guests];

  return (
    <div className="flex h-[230px] items-center justify-center gap-5 pt-6 sm:pt-8">
      <div className="w-[82%] max-w-[210px] rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:w-[46%]">
        <div className="flex items-center gap-3 border-b border-[#edf2f7] pb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-[#0040c1] ring-1 ring-[#bfdbfe]">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 12.25a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4.75 20.25a7.25 7.25 0 0 1 14.5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0f172a]">{g.name}</p>
            <p className="mt-0.5 text-[8px] text-[#64748b]">{g.email}</p>
            <p className="text-[8px] text-[#64748b]">{g.phone}</p>
          </div>
        </div>
        {fields.map((field) => (
          <div key={field.label} className="grid grid-cols-[48px_1fr_auto] gap-2 border-b border-[#f1f5f9] py-2 text-[8px] last:border-0">
            <span className="font-semibold text-[#64748b]">{field.label}</span>
            <span className="font-bold text-[#334155]">{field.date}</span>
            <span className="text-[#64748b]">{field.time}</span>
          </div>
        ))}
      </div>
      <div className="relative hidden min-w-[190px] sm:block">
        <span className="absolute start-[13px] top-4 h-[160px] w-px bg-[#dbeafe]" />
        <div className="space-y-5">
          {g.steps.map((step, index) => (
            <div key={step.title} className="relative flex gap-3">
              <span className={["relative z-10 flex h-7 w-7 items-center justify-center rounded-lg text-white", ["bg-[#10b981]", "bg-[#3b82f6]", "bg-[#7c3aed]", "bg-[#64748b]"][index]].join(" ")}>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 12.5 10.3 16 17 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] font-bold text-[#0f172a]">{step.title}</p>
                <p className="mt-0.5 text-[8px] text-[#64748b]">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsVisual() {
  const { t } = useLanguage();
  const p = t.features.payments;

  return (
    <div className="flex h-[230px] items-center justify-center gap-5 pt-8">
      <div className="w-[82%] max-w-[280px] rotate-[-7deg] rounded-2xl bg-gradient-to-br from-[#4338ca] via-[#2563eb] to-[#0040c1] p-5 text-white shadow-[0_24px_55px_rgba(0,64,193,0.28)] sm:w-[58%] rtl:rotate-[7deg]">
        <div className="mb-8 flex items-center justify-between">
          <span className="h-6 w-10 rounded bg-white/20" />
          <span className="text-[10px] font-medium text-white/75">{p.balance}</span>
        </div>
        <p className="font-mono text-lg tracking-[0.22em]">1234 5678 9012 3456</p>
        <div className="mt-6 flex items-end justify-between">
          <span className="text-xs text-white/75">12/28</span>
          <strong className="text-sm">$8,920.00</strong>
        </div>
      </div>
      <div className="hidden w-[34%] max-w-[180px] space-y-3 sm:block">
        {p.benefits.map((benefit) => (
          <MiniBenefit key={benefit.title} title={benefit.title} copy={benefit.copy} />
        ))}
      </div>
    </div>
  );
}

function MiniBenefit({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#edf2fb]">
      <p className="text-[10px] font-bold text-[#0f172a]">{title}</p>
      <p className="mt-1 text-[8px] leading-relaxed text-[#64748b]">{copy}</p>
    </div>
  );
}

function ChannelVisual() {
  const { t } = useLanguage();
  const ch = t.features.channel;
  const logos = [
    { name: "Airbnb", className: "left-1/2 top-[-17px] -translate-x-1/2 text-[#ff385c]" },
    { name: "Vrbo", className: "left-[-27px] top-1/2 -translate-y-1/2 text-[#334155]" },
    { name: "Booking.com", className: "right-[-27px] top-1/2 -translate-y-1/2 text-[#003b95]" },
    { name: "Expedia", className: "bottom-[-17px] left-1/2 -translate-x-1/2 text-[#f5b800]" },
  ];
  const orbitDots = [
    "left-[82%] top-[18%]",
    "left-[82%] top-[82%]",
    "left-[18%] top-[82%]",
    "left-[18%] top-[18%]",
  ];

  return (
    <div className="grid h-[230px] grid-cols-1 items-center gap-4 pt-7 sm:grid-cols-[1fr_150px]">
      <div className="relative mx-auto h-[190px] w-[260px] max-w-full">
        <div className="absolute left-1/2 top-1/2 h-[176px] w-[176px] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full w-full animate-[spin_22s_linear_infinite]">
            <div className="absolute inset-3 rounded-full border border-dashed border-[#8fb4ff]" />
            {orbitDots.map((dotClass) => (
              <span
                key={dotClass}
                className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0040c1] shadow-[0_0_0_5px_rgba(0,64,193,0.08)] ${dotClass}`}
              />
            ))}
            {logos.map((logo) => (
              <div key={logo.name} className={`absolute flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white text-center text-[8px] font-black leading-tight shadow-md ring-1 ring-[#e5edfb] ${logo.className}`}>
                <span className="max-w-12 animate-[spin_22s_linear_infinite_reverse]">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-[#dbe7ff]">
          <svg className="h-7 w-7 animate-channel-hub-step text-[#0040c1]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.9" />
            <circle cx="5" cy="6" r="2" fill="currentColor" />
            <circle cx="19" cy="6" r="2" fill="currentColor" />
            <circle cx="5" cy="18" r="2" fill="currentColor" />
            <circle cx="19" cy="18" r="2" fill="currentColor" />
            <path d="M7 7.4 9.5 9.6M17 7.4l-2.5 2.2M7 16.6l2.5-2.2M17 16.6l-2.5-2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="hidden space-y-3 sm:block">
        {ch.benefits.map((item) => (
          <div key={item.title} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#edf2fb]">
            <p className="text-[10px] font-bold text-[#0f172a]">{item.title}</p>
            <p className="mt-1 text-[8px] leading-relaxed text-[#64748b]">{item.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectBookingVisual() {
  const { t } = useLanguage();
  const d = t.features.directBooking;

  return (
    <div className="flex h-[280px] items-end justify-center gap-3 pb-1 pt-2 sm:justify-between sm:gap-4 sm:pt-0">
      <div className="relative w-full max-w-[420px] shrink-0 sm:w-[58%] sm:max-w-[340px] sm:shrink-0">
        <Image
          src="/c17a8ab1-e6f7-4dd0-837c-bbbbad3f94cc-removebg-preview.png"
          alt={t.features.laptopAlt}
          width={612}
          height={408}
          className="h-auto w-full min-h-[210px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] sm:min-h-[220px]"
        />
      </div>
      <div className="hidden min-w-0 flex-1 space-y-2 sm:block sm:max-w-[42%] sm:pe-2">
        {d.benefits.map((item) => (
          <div key={item.title} className="rounded-xl bg-white/12 p-3 ring-1 ring-white/15">
            <p className="text-[10px] font-bold text-white">{item.title}</p>
            <p className="mt-1 text-[8px] leading-relaxed text-white/70">{item.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsVisual() {
  const { t } = useLanguage();
  const r = t.features.reports;
  const bars = [54, 76, 62, 88, 49, 80, 70, 94, 58, 86, 74, 98];

  return (
    <div className="flex h-[230px] items-center justify-center gap-3 pt-8 sm:gap-4">
      <div className="w-[86%] max-w-[240px] rounded-2xl bg-white p-3.5 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:w-[55%]">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold text-[#64748b]">{r.overview}</p>
            <p className="mt-1 text-xl font-black text-[#0f172a]">{r.amount}</p>
            <p className="text-[9px] font-bold text-[#16a34a]">{r.change}</p>
          </div>
          <span className="rounded-full bg-[#f8fafc] px-2 py-1 text-[8px] font-bold text-[#64748b]">{r.period}</span>
        </div>
        <div className="flex h-20 items-end gap-1.5 border-l border-b border-[#e2e8f0] pl-2">
          {bars.map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-gradient-to-t from-[#0040c1] to-[#60a5fa]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <div className="hidden w-[35%] max-w-[150px] grid-cols-2 gap-2 sm:grid">
        {r.stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-[#edf2fb]">
            <p className="min-h-6 text-[8px] font-bold leading-tight text-[#64748b]">{stat.label}</p>
            <div className="mt-1 flex items-end justify-between gap-1">
              <p className="text-sm font-black text-[#0f172a]">{stat.value}</p>
              <span className="text-[8px] font-black text-[#16a34a]">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const featureVisuals = [
  <CalendarVisual key="calendar" />,
  <GuestVisual key="guest" />,
  <PaymentsVisual key="payments" />,
  <ChannelVisual key="channel" />,
  <DirectBookingVisual key="direct" />,
  <ReportsVisual key="reports" />,
] as const;

export function Features() {
  const { t } = useLanguage();
  const f = t.features;

  return (
    <Section id="features" className="bg-white" containerClassName="max-w-6xl">
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Tag>{f.badge}</Tag>
        </div>
        <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#0a0a0a] sm:text-4xl lg:text-[2.75rem]">
          {f.title}{" "}
          <span className="text-[#0040c1]">{f.titleHighlight}</span>
        </h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
        {f.cards.map((card, index) => (
          <FeatureCard
            key={card.index}
            index={card.index}
            title={card.title}
            description={card.description}
            blue={index === 4}
            tallVisual={index === 4}
          >
            {featureVisuals[index]}
          </FeatureCard>
        ))}
      </RevealGroup>
    </Section>
  );
}
