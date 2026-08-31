"use client";

import { useState } from "react";

interface ShareButtonProps {
  carId: number;
  title: string;
  className?: string;
}

export default function ShareButton({ carId, title, className = "" }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/car/${carId}` : "";
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const botLink = `https://t.me/${botUsername}?start=car_${carId}`;
  const shareText = `Дивись яке авто!\n\n${botLink}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent(shareText)}`;

  const shareOptions = [
    {
      name: "Telegram",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      url: telegramShareUrl,
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Viber",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 0C5.8 0 .3 4.8.1 11.4c0 1.2.2 2.4.5 3.5L0 24l9.3-2.4c1 .3 2.1.4 3.2.4 6.7 0 12.2-4.8 12.4-11.4C25.2 4.8 19.7 0 12.5 0zm.1 19.6c-.8 0-1.6-.1-2.4-.3l-2.8-.7-2.9.8.8-3-.6-2.8c-.3-1-.4-2-.4-3 0-5.5 4.8-10 10.7-10s10.7 4.5 10.7 10-4.8 10-10.9 10z" />
        </svg>
      ),
      url: `viber://forward?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowMenu(false);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={`icon-btn p-2 ${className}`}
        title="Поділитися"
      >
        <svg
          className="w-5 h-5 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-11 z-50 bg-white rounded-xl shadow-medium border border-border py-1 min-w-[160px]">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <span className="text-muted">{option.icon}</span>
                {option.name}
              </a>
            ))}
            <button
              type="button"
              onClick={copyToClipboard}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition-colors text-left"
            >
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Копіювати
            </button>
          </div>
        </>
      )}
    </div>
  );
}
