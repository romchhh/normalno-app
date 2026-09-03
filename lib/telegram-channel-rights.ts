import {
  getApi,
  isTelegramBotConfigured,
} from "@/lib/telegram-bot";

export type ChannelRightsCheck = {
  ok: boolean;
  channelId: string;
  title?: string;
  username?: string | null;
  botStatus?: string;
  canPost?: boolean;
  error?: string;
};

function normalizeChannelId(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("@")) return trimmed;
  if (/^-?\d+$/.test(trimmed)) return trimmed;
  if (/^https?:\/\/t\.me\//i.test(trimmed)) {
    const part = trimmed.replace(/^https?:\/\/t\.me\//i, "").split(/[/?#]/)[0];
    if (part.startsWith("+") || part.startsWith("c/")) return trimmed;
    return part.startsWith("@") ? part : `@${part}`;
  }
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

export async function verifyBotChannelRights(
  channelIdRaw: string
): Promise<ChannelRightsCheck> {
  const channelId = normalizeChannelId(channelIdRaw);
  if (!channelId) {
    return { ok: false, channelId: "", error: "Вкажіть ID або @username каналу" };
  }

  if (!isTelegramBotConfigured()) {
    return {
      ok: false,
      channelId,
      error: "TELEGRAM_BOT_TOKEN не налаштовано в .env",
    };
  }

  try {
    const api = getApi();
    const me = await api.getMe();
    const chat = await api.getChat({ chat_id: channelId });
    const member = await api.getChatMember({
      chat_id: channelId,
      user_id: me.id,
    });

    const status = member.status;
    const canPost =
      status === "creator" ||
      (status === "administrator" &&
        ("can_post_messages" in member
          ? member.can_post_messages !== false
          : true));

    if (!canPost) {
      return {
        ok: false,
        channelId: String(chat.id),
        title: "title" in chat ? String(chat.title || "") : undefined,
        username: "username" in chat ? chat.username || null : null,
        botStatus: status,
        canPost: false,
        error:
          status === "left" || status === "kicked"
            ? "Бота немає в каналі. Додайте бота як адміністратора з правом публікувати повідомлення."
            : "Бот є в каналі, але без права публікувати. Зробіть його адміністратором з can_post_messages.",
      };
    }

    return {
      ok: true,
      channelId: String(chat.id),
      title: "title" in chat ? String(chat.title || "") : undefined,
      username: "username" in chat ? chat.username || null : null,
      botStatus: status,
      canPost: true,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Перевірка не вдалась";
    return {
      ok: false,
      channelId,
      error: message.includes("chat not found")
        ? "Канал не знайдено. Перевірте ID/@username і що бот доданий у канал."
        : message,
    };
  }
}
