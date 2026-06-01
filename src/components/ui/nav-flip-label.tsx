"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const FLIP_DURATION = 420;
const WORD_STAGGER = 72;
const SPRING_EASE = "cubic-bezier(0.34, 1.35, 0.64, 1)";
const EXIT_EASE = "cubic-bezier(0.55, 0, 0.85, 0.36)";

type NavFlipLabelProps = {
  label: string;
  hovered: boolean;
  className?: string;
};

type LayerPair = {
  a: HTMLSpanElement;
  b: HTMLSpanElement;
  activeIsA: boolean;
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function measureFlipOffset(before: DOMRect, after: DOMRect) {
  return {
    x: before.left - after.left,
    y: before.top - after.top,
  };
}

function buildTransforms(
  index: number,
  entering: boolean,
  phase: "out-start" | "out-end" | "in-start" | "in-end",
  offset?: { x: number; y: number },
) {
  const wave = index % 2 === 0 ? 1 : -1;
  const tilt = 72 * wave;
  const spin = 8 * wave;
  const x = offset?.x ?? 0;
  const y = offset?.y ?? 0;

  if (phase === "out-start") {
    return `translate(${x}px, ${y}px) rotateX(0deg) rotateZ(0deg) scale(1)`;
  }

  if (phase === "out-end") {
    const exitY = entering ? -14 : 14;
    const exitRotateX = entering ? -tilt : tilt;
    return `translate(${x}px, ${exitY}px) rotateX(${exitRotateX}deg) rotateZ(${-spin}deg) scale(0.88)`;
  }

  if (phase === "in-start") {
    const enterY = entering ? (wave === 1 ? 115 : -115) : wave === 1 ? -115 : 115;
    const enterRotateX = entering ? (wave === 1 ? tilt : -tilt) : wave === 1 ? -tilt : tilt;
    return `translateY(${enterY}%) rotateX(${enterRotateX}deg) rotateZ(${spin}deg) scale(0.82)`;
  }

  return "translateY(0) rotateX(0deg) rotateZ(0deg) scale(1)";
}

async function playCreativeFlip(
  pair: LayerPair,
  index: number,
  entering: boolean,
) {
  const outgoing = pair.activeIsA ? pair.a : pair.b;
  const incoming = pair.activeIsA ? pair.b : pair.a;

  const before = outgoing.getBoundingClientRect();

  outgoing.classList.add("nav-flip-inactive");
  incoming.classList.remove("nav-flip-hidden");
  incoming.classList.remove("nav-flip-inactive");

  const after = outgoing.getBoundingClientRect();
  const offset = measureFlipOffset(before, after);

  const outAnim = outgoing.animate(
    [
      {
        opacity: 1,
        filter: "blur(0px)",
        transform: buildTransforms(index, entering, "out-start", offset),
      },
      {
        opacity: 0,
        filter: "blur(5px)",
        transform: buildTransforms(index, entering, "out-end", offset),
      },
    ],
    { duration: FLIP_DURATION, fill: "forwards", easing: EXIT_EASE },
  );

  const inAnim = incoming.animate(
    [
      {
        opacity: 0,
        filter: "blur(6px)",
        transform: buildTransforms(index, entering, "in-start"),
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        transform: buildTransforms(index, entering, "in-end"),
      },
    ],
    {
      duration: FLIP_DURATION + 80,
      delay: 40,
      fill: "both",
      easing: SPRING_EASE,
    },
  );

  await Promise.all([outAnim.finished, inAnim.finished]);

  [outgoing, incoming].forEach((el) => {
    el.getAnimations().forEach((anim) => anim.cancel());
    el.style.opacity = "";
    el.style.transform = "";
    el.style.filter = "";
  });

  outgoing.classList.add("nav-flip-hidden");
  outgoing.classList.remove("nav-flip-inactive");
  pair.activeIsA = !pair.activeIsA;
}

function FlipWord({
  word,
  index,
  hovered,
}: {
  word: string;
  index: number;
  hovered: boolean;
}) {
  const pairRef = useRef<LayerPair | null>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);
  const hoveredRef = useRef(hovered);
  const animatingRef = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    if (!pairRef.current) {
      pairRef.current = { a, b, activeIsA: true };
      b.classList.add("nav-flip-hidden");
    }
  }, []);

  const runFlip = useCallback(
    async (entering: boolean) => {
      if (prefersReducedMotion.current || !pairRef.current) return;
      if (animatingRef.current) return;

      animatingRef.current = true;
      await wait(index * WORD_STAGGER);

      try {
        await playCreativeFlip(pairRef.current, index, entering);
      } finally {
        animatingRef.current = false;
      }
    },
    [index],
  );

  useEffect(() => {
    if (hoveredRef.current === hovered) return;
    hoveredRef.current = hovered;
    void runFlip(hovered);
  }, [hovered, runFlip]);

  return (
    <span className="nav-flip-slot" style={{ zIndex: 10 - index }}>
      <span ref={aRef} className="nav-flip-layer">
        {word}
      </span>
      <span ref={bRef} className="nav-flip-layer nav-flip-hidden" aria-hidden>
        {word}
      </span>
    </span>
  );
}

export function NavFlipLabel({ label, hovered, className }: NavFlipLabelProps) {
  const words = label.split(" ");

  return (
    <span
      className={cn("inline-flex items-end gap-[0.3em] [perspective:420px]", className)}
      aria-label={label}
    >
      {words.map((word, index) => (
        <FlipWord key={`${word}-${index}`} word={word} index={index} hovered={hovered} />
      ))}
    </span>
  );
}
