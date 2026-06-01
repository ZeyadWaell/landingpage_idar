import { ar } from "./ar";
import { en } from "./en";
import type { Locale } from "../types";

export const dictionaries = { en, ar } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = (typeof dictionaries)[Locale];
