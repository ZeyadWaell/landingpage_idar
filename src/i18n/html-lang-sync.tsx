"use client";

import { useEffect } from "react";
import { useLanguage } from "./language-provider";

export function HtmlLangSync() {
  const { locale, dir } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
