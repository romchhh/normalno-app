import Link from "next/link";
import Image from "next/image";

interface CategoryLinkCardProps {
  href: string;
  name: string;
  description?: string | null;
  image: string | null;
  compact?: boolean;
}

export default function CategoryLinkCard({
  href,
  name,
  description,
  image,
  compact = false,
}: CategoryLinkCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex items-stretch overflow-hidden border border-border rounded-xl bg-white hover:border-brand/40 transition-colors ${
        compact ? "h-[76px]" : "min-h-[96px]"
      }`}
    >
      <div className={`flex flex-1 min-w-0 items-center gap-2 z-10 ${compact ? "pl-3 py-2" : "pl-4 py-3"}`}>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <span
            className={`font-semibold text-foreground leading-tight ${
              compact ? "text-xs sm:text-sm line-clamp-2" : "text-base sm:text-lg"
            }`}
          >
            {name}
          </span>
          {description && !compact && (
            <span className="text-xs sm:text-sm text-muted line-clamp-2 mt-1">{description}</span>
          )}
        </div>
        <span
          className={`flex-shrink-0 text-brand transition-transform duration-200 group-hover:translate-x-0.5 ${
            compact ? "pr-1" : "pr-1.5"
          }`}
          aria-hidden
        >
          <svg
            className={compact ? "w-4 h-4" : "w-5 h-5"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {image && (
        <div
          className={`relative flex-shrink-0 self-center ${
            compact ? "w-[92px] h-[60px] -mr-1" : "w-[108px] sm:w-[128px] h-[72px] sm:h-[84px] -mr-1"
          }`}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-right scale-110 group-hover:scale-[1.15] transition-transform duration-300"
            sizes={compact ? "92px" : "128px"}
          />
        </div>
      )}
    </Link>
  );
}
