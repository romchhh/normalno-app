import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

// Disable body parsing limit for file uploads
export const runtime = "nodejs";
export const maxDuration = 30;

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Helper function to load categories
async function loadCategories() {
  await ensureDataDir();
  const categories: Record<string, { name: string; image: string | null; description: string | null; slug: string; priority: number }> = {};
  
  if (existsSync(CATEGORIES_FILE)) {
    const fileContent = await readFile(CATEGORIES_FILE, "utf-8");
    const loaded = JSON.parse(fileContent);
    // Migrate old categories to include priority
    Object.keys(loaded).forEach((key) => {
      categories[key] = {
        ...loaded[key],
        priority: loaded[key].priority !== undefined ? loaded[key].priority : 999,
      };
    });
  }
  
  return categories;
}

// Helper function to save categories
async function saveCategories(categories: Record<string, { name: string; image: string | null; description: string | null; slug: string; priority: number }>) {
  await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

// Get categories
export async function GET() {
  try {
    const categories = await loadCategories();
    return NextResponse.json(categories);
  } catch (err: unknown) {
    console.error("Error reading categories:", err);
    const errorMessage = err instanceof Error ? err.message : "Помилка при читанні категорій";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}

// Create or update category
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    const formData = await request.formData();
    const action = formData.get("action") as string;
    
    // DELETE action
    if (action === "delete") {
      const categoryKey = formData.get("categoryKey") as string;
      if (!categoryKey) {
        return NextResponse.json(
          { message: "Категорія не вказана" },
          { status: 400 }
        );
      }
      
      const categories = await loadCategories();
      
      if (!categories[categoryKey]) {
        return NextResponse.json(
          { message: "Категорія не знайдена" },
          { status: 404 }
        );
      }
      
      // Delete image file if exists
      if (categories[categoryKey].image) {
        try {
          const imagePath = categories[categoryKey].image;
          if (imagePath.startsWith("/api/categories/image/")) {
            const fileName = imagePath.replace("/api/categories/image/", "");
            const filePath = path.join(process.cwd(), "public", "categories", fileName);
            if (existsSync(filePath)) {
              await unlink(filePath);
            }
          }
        } catch (err) {
          console.error("Error deleting image file:", err);
        }
      }
      
      delete categories[categoryKey];
      await saveCategories(categories);
      
      return NextResponse.json({
        message: "Категорію успішно видалено",
        categories,
      });
    }
    
    // CREATE action
    if (action === "create") {
      const name = formData.get("name") as string;
      const slug = formData.get("slug") as string;
      const description = formData.get("description") as string | null;
      
      if (!name || !slug) {
        return NextResponse.json(
          { message: "Назва та slug обов&apos;язкові" },
          { status: 400 }
        );
      }
      
      const categories = await loadCategories();
      
      // Check if slug already exists
      if (categories[slug]) {
        return NextResponse.json(
          { message: "Категорія з таким slug вже існує" },
          { status: 400 }
        );
      }
      
      // Get max priority to set new category at the end
      const maxPriority = Math.max(...Object.values(categories).map(c => c.priority || 0), 0);
      
      const priority = formData.get("priority") as string | null;
      const priorityNum = priority ? parseInt(priority, 10) : maxPriority + 1;
      
      categories[slug] = {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        image: null,
        description: description ? description.trim() : null,
        priority: !isNaN(priorityNum) ? priorityNum : maxPriority + 1,
      };
      
      await saveCategories(categories);
      
      return NextResponse.json({
        message: "Категорію успішно створено",
        categories,
      });
    }
    
    // UPDATE action (default)
    const categoryKey = formData.get("categoryKey") as string;
    if (!categoryKey) {
      return NextResponse.json(
        { message: "Категорія не вказана" },
        { status: 400 }
      );
    }
    
    const categories = await loadCategories();
    
    // If category doesn't exist, create it
    if (!categories[categoryKey]) {
      const maxPriority = Math.max(...Object.values(categories).map(c => c.priority || 0), 0);
      categories[categoryKey] = {
        name: categoryKey,
        slug: categoryKey,
        image: null,
        description: null,
        priority: maxPriority + 1,
      };
    }
    
    // Update name if provided
    const name = formData.get("name") as string | null;
    if (name !== null) {
      categories[categoryKey].name = name.trim();
    }
    
    // Update priority if provided
    const priority = formData.get("priority") as string | null;
    if (priority !== null) {
      const priorityNum = parseInt(priority, 10);
      if (!isNaN(priorityNum)) {
        categories[categoryKey].priority = priorityNum;
      }
    }
    
    // Update slug if provided
    const newSlug = formData.get("slug") as string | null;
    if (newSlug !== null && newSlug !== categoryKey) {
      const trimmedSlug = newSlug.trim().toLowerCase();
      if (categories[trimmedSlug] && trimmedSlug !== categoryKey) {
        return NextResponse.json(
          { message: "Категорія з таким slug вже існує" },
          { status: 400 }
        );
      }
      categories[trimmedSlug] = { ...categories[categoryKey], slug: trimmedSlug };
      if (trimmedSlug !== categoryKey) {
        delete categories[categoryKey];
      }
    }
    
    // Handle image upload
    const file = formData.get("image") as File | null;
    if (file && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Файл повинен бути зображенням" },
          { status: 400 }
        );
      }
      
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { message: "Розмір файлу не повинен перевищувати 10MB" },
          { status: 400 }
        );
      }
      
      try {
        const publicDir = path.join(process.cwd(), "public", "categories");
        if (!existsSync(publicDir)) {
          await mkdir(publicDir, { recursive: true });
        }
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = file.name.split(".").pop() || "png";
        const finalSlug = newSlug ? newSlug.trim().toLowerCase() : categoryKey;
        const fileName = `${finalSlug}.${fileExtension}`;
        const filePath = path.join(publicDir, fileName);
        
        // Delete old image if exists
        if (categories[categoryKey]?.image) {
          try {
            const oldImagePath = categories[categoryKey].image;
            if (oldImagePath.startsWith("/api/categories/image/")) {
              const oldFileName = oldImagePath.replace("/api/categories/image/", "");
              const oldFilePath = path.join(process.cwd(), "public", "categories", oldFileName);
              if (existsSync(oldFilePath) && oldFileName !== fileName) {
                await unlink(oldFilePath);
              }
            }
          } catch (err) {
            console.error("Error deleting old image:", err);
          }
        }
        
        await writeFile(filePath, buffer);
        const imagePath = `/api/categories/image/${fileName}`;
        const finalKey = newSlug ? newSlug.trim().toLowerCase() : categoryKey;
        if (categories[finalKey]) {
          categories[finalKey].image = imagePath;
        }
      } catch (fileError: unknown) {
        const errorMessage = fileError instanceof Error ? fileError.message : "Невідома помилка";
        return NextResponse.json(
          { message: `Помилка збереження файлу: ${errorMessage}` },
          { status: 500 }
        );
      }
    }
    
    // Handle description update
    const description = formData.get("description") as string | null;
    if (description !== null) {
      const finalKey = newSlug ? newSlug.trim().toLowerCase() : categoryKey;
      if (categories[finalKey]) {
        categories[finalKey].description = description.trim() || null;
      }
    }
    
    await saveCategories(categories);
    
    return NextResponse.json({
      message: "Категорію успішно оновлено",
      categories,
    });
  } catch (err: unknown) {
    console.error("Error updating category:", err);
    const errorMessage = err instanceof Error ? err.message : "Помилка при оновленні категорії";
    const errorStack = err instanceof Error && process.env.NODE_ENV === "development" ? err.stack : undefined;
    return NextResponse.json(
      { 
        message: errorMessage,
        error: errorStack
      },
      { status: 500 }
    );
  }
}
