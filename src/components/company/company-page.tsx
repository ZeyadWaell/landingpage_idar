"use client";

import { ContentPageLayout } from "@/components/content/content-page-layout";
import { useLanguage } from "@/i18n/language-provider";

type CompanySlug = "about" | "blog" | "careers";

export function CompanyPage({ slug }: { slug: CompanySlug }) {
  const { t } = useLanguage();
  const page = t.companyPages[slug];

  return (
    <ContentPageLayout
      backLabel={t.legalPages.backHome}
      title={page.title}
      subtitle={"intro" in page ? page.intro : undefined}
    >
      {"posts" in page && page.posts && (
        <ul className="mt-12 space-y-6">
          {page.posts.map((post) => (
            <li
              key={post.title}
              className="rounded-2xl border border-[#171717]/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <p className="text-xs font-medium text-[#0040c1] dark:text-[#699aff]">{post.date}</p>
              <h2 className="mt-2 text-lg font-semibold text-[#0a0a0a] dark:text-white">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#171717]/75 dark:text-[#eff4ff]/75">
                {post.excerpt}
              </p>
            </li>
          ))}
        </ul>
      )}

      {"openings" in page && page.openings && (
        <ul className="mt-12 space-y-4">
          {page.openings.map((job) => (
            <li
              key={job.title}
              className="rounded-2xl border border-[#171717]/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <h2 className="text-lg font-semibold text-[#0a0a0a] dark:text-white">{job.title}</h2>
              <p className="mt-1 text-sm text-[#0040c1] dark:text-[#699aff]">
                {job.location} · {job.type}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#171717]/75 dark:text-[#eff4ff]/75">
                {job.description}
              </p>
            </li>
          ))}
        </ul>
      )}

      {"sections" in page && page.sections && (
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
      )}
    </ContentPageLayout>
  );
}
