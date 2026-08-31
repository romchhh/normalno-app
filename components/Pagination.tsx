"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  filters?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  filters = {},
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [pathname, searchParams]);

  const createPageLink = (pageNum: number) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    params.set("page", pageNum.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageClass = (pageNum: number) =>
    `min-w-[36px] h-9 px-3 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
      currentPage === pageNum
        ? "bg-brand text-white"
        : "bg-white text-foreground border border-border hover:border-brand/40 hover:text-brand"
    }`;

  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pages.push(i);
  }

  if (totalPages > 3) {
    if (currentPage > 3 && currentPage < totalPages) {
      if (currentPage > 4) pages.push("...");
      if (!pages.includes(currentPage)) pages.push(currentPage);
    }

    if (totalPages > 3 && !pages.includes(totalPages)) {
      if (currentPage < totalPages - 2 && !pages.includes("...")) {
        pages.push("...");
      } else if (currentPage === totalPages - 2 && !pages.includes("...")) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
  }

  const navBtn =
    "h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-white text-muted hover:text-brand hover:border-brand/40 transition-colors";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div className="flex justify-center items-center flex-wrap gap-2">
        {currentPage > 1 && (
          <Link href={createPageLink(currentPage - 1)} onClick={handleLinkClick} className={navBtn}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        )}

        {pages.map((item, idx) => {
          if (item === "...") {
            return (
              <span key={`ellipsis-${idx}`} className="px-1 text-muted text-sm select-none">
                …
              </span>
            );
          }

          const pageNum = item as number;
          return (
            <Link
              key={pageNum}
              href={createPageLink(pageNum)}
              onClick={handleLinkClick}
              className={pageClass(pageNum)}
            >
              {pageNum}
            </Link>
          );
        })}

        {currentPage < totalPages && (
          <Link href={createPageLink(currentPage + 1)} onClick={handleLinkClick} className={navBtn}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}
