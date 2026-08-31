import { prisma } from "@/lib/db";

export type LeadSource = "contact" | "order" | "wizard" | "modal" | "section";

export async function createLead(data: {
  name: string;
  phone: string;
  message?: string | null;
  source: LeadSource | string;
  carId?: number | null;
  carLabel?: string | null;
  telegramId?: string | null;
  telegramUsername?: string | null;
  bitrixLeadId?: number | null;
  bitrixStatus?: string | null;
  meta?: Record<string, unknown> | null;
}) {
  return prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone,
      message: data.message || null,
      source: data.source,
      carId: data.carId ?? null,
      carLabel: data.carLabel || null,
      telegramId: data.telegramId || null,
      telegramUsername: data.telegramUsername || null,
      bitrixLeadId: data.bitrixLeadId ?? null,
      bitrixStatus: data.bitrixStatus || null,
      meta: data.meta ? JSON.stringify(data.meta) : null,
    },
  });
}
