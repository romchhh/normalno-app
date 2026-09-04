"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
          query_id?: string;
          auth_date?: number;
          hash?: string;
        };
        version: string;
        platform: string;
        colorScheme: "light" | "dark";
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        isClosingConfirmationEnabled: boolean;
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
          notificationOccurred: (type: "error" | "success" | "warning") => void;
          selectionChanged: () => void;
        };
        /** Bot API 6.9+ — request phone contact share */
        requestContact?: (
          callback?: (
            shared: boolean,
            response?: {
              status?: string;
              response?: string | { contact?: { phone_number?: string } };
              responseUnsafe?: {
                contact?: {
                  phone_number?: string;
                  first_name?: string;
                  last_name?: string;
                  user_id?: number;
                };
              };
            }
          ) => void
        ) => void;
        onEvent?: (
          eventType: string,
          eventHandler: (event: {
            status?: string;
            response?: string | { contact?: { phone_number?: string } };
            responseUnsafe?: {
              contact?: {
                phone_number?: string;
                first_name?: string;
                last_name?: string;
                user_id?: number;
              };
            };
          }) => void
        ) => void;
        offEvent?: (eventType: string, eventHandler: (...args: unknown[]) => void) => void;
      };
    };
  }
}

export default function TelegramWebApp() {
  useEffect(() => {
    // Wait for Telegram Web App SDK to load
    const initTelegramWebApp = () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        // Initialize Web App
        tg.ready();

        // Expand to fullscreen immediately
        if (!tg.isExpanded) {
          tg.expand();
        }

        // Set header and background colors to match site theme
        tg.setHeaderColor("#ffffff");
        tg.setBackgroundColor("#f9fafb");

        // Enable closing confirmation (optional - prevents accidental closing)
        // Uncomment if you want to prevent accidental closing
        // tg.enableClosingConfirmation();

        // Log Web App info (for debugging - remove in production)
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Telegram Web App initialized:", {
            version: tg.version,
            platform: tg.platform,
            isExpanded: tg.isExpanded,
            viewportHeight: tg.viewportHeight,
            colorScheme: tg.colorScheme,
          });
        }
      } else {
        // Retry if SDK not loaded yet
        setTimeout(initTelegramWebApp, 100);
      }
    };

    // Start initialization
    initTelegramWebApp();
  }, []);

  return null; // This component doesn't render anything
}

