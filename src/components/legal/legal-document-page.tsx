"use client";

import { ContentPageLayout } from "@/components/content/content-page-layout";
import { useLanguage } from "@/i18n/language-provider";

type LegalSlug = "privacy" | "terms" | "security";

export function LegalDocumentPage({ slug }: { slug: LegalSlug }) {
  const { t } = useLanguage();
  const page = t.legalPages[slug];

  return (
    <ContentPageLayout
      backLabel={t.legalPages.backHome}
      title={page.title}
      subtitle={page.updated}
    >
      <div className="mt-12 space-y-10">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-[#0a0a0a] dark:text-white">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-[#171717]/75 dark:text-[#eff4ff]/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ContentPageLayout>
  );
}
