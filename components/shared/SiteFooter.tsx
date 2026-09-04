import { getActivePartners } from "@/lib/partners-db";
import PartnersList from "@/components/PartnersList";
import Footer from "@/components/shared/Footer";

export default async function SiteFooter() {
  const partners = await getActivePartners();
  return <Footer partners={partners} />;
}
