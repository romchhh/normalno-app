import Category from "@/components/Category";
import { validCategories } from "@/constants/categories";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const sp = await searchParams;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const page = Math.max(1, parseInt(sp.page || "1", 10));

  // All filters from URL (excluding page)
  const filters = { ...sp };
  delete filters.page;

  return <Category category={category} page={page} filters={filters} />;
}
