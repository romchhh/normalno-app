import { prisma } from "@/lib/db";
import type { PublicPartner } from "@/lib/partners";

export async function getActivePartners(): Promise<PublicPartner[]> {
  try {
    return await prisma.partner.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        photo: true,
        description: true,
      },
    });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}
