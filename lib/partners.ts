/** Transliterate Ukrainian/Russian-ish text to URL slug. */
export function slugifyPartner(input: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
    ы: "y",
    э: "e",
    ё: "yo",
    ъ: "",
  };

  const lower = input.trim().toLowerCase();
  let out = "";
  for (const ch of lower) {
    if (map[ch] !== undefined) out += map[ch];
    else if (/[a-z0-9]/.test(ch)) out += ch;
    else if (/\s|-|_/.test(ch)) out += "-";
  }
  out = out.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return out || `partner-${Date.now().toString(36)}`;
}

export function partnerCatalogPath(slug: string): string {
  return `/partner/${slug}`;
}

export function partnerCatalogAbsoluteUrl(slug: string, origin?: string): string {
  const base =
    origin ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.WEB_APP_URL?.replace(/\/wizard\/?$/, "") ||
    "https://normalno-auto.com";
  return `${base.replace(/\/$/, "")}${partnerCatalogPath(slug)}`;
}
