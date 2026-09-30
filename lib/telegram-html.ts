/**
 * Truncate Telegram HTML without leaving unclosed tags.
 * Naive slice(0, 1020) breaks <a>/<b> and causes:
 * "Can't find end tag corresponding to start tag a"
 */
export function truncateTelegramHtml(html: string, maxLength: number): string {
  if (html.length <= maxLength) return html;

  const ellipsis = "…";
  const budget = Math.max(0, maxLength - ellipsis.length);
  let cut = html.slice(0, budget);

  // Drop an incomplete tag at the end: <a href="https://...
  cut = cut.replace(/<[^>]*$/, "");

  // Prefer cutting on a line boundary when possible
  const lastNewline = cut.lastIndexOf("\n");
  if (lastNewline > budget * 0.5) {
    cut = cut.slice(0, lastNewline);
  }

  const openTags: string[] = [];
  const tagRe = /<\/?([a-zA-Z0-9]+)(?:\s[^>]*)?>/g;
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(cut)) !== null) {
    const full = match[0];
    const name = match[1]!.toLowerCase();
    if (full.startsWith("</")) {
      for (let i = openTags.length - 1; i >= 0; i--) {
        if (openTags[i] === name) {
          openTags.splice(i, 1);
          break;
        }
      }
    } else if (!/\/>$/.test(full)) {
      openTags.push(name);
    }
  }

  let result = `${cut.trimEnd()}${ellipsis}`;
  for (let i = openTags.length - 1; i >= 0; i--) {
    result += `</${openTags[i]}>`;
  }

  if (result.length > maxLength) {
    const plain = html.replace(/<[^>]+>/g, "");
    return `${plain.slice(0, Math.max(0, maxLength - 1))}${ellipsis}`;
  }
  return result;
}
