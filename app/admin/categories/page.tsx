"use client";

import { useState, useEffect, useRef } from "react";

interface Category {
  name: string;
  image: string | null;
  description: string | null;
  slug: string;
  priority: number;
}

interface Categories {
  [key: string]: Category;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Categories>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "", priority: 0 });
  const [editingData, setEditingData] = useState<Record<string, { name: string; slug: string; description: string; priority: number }>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
      // Initialize editing data
      const editData: Record<string, { name: string; slug: string; description: string; priority: number }> = {};
      Object.keys(data).forEach((key) => {
        editData[key] = {
          name: data[key].name || "",
          slug: data[key].slug || key,
          description: data[key].description || "",
          priority: data[key].priority !== undefined ? data[key].priority : 999,
        };
      });
      setEditingData(editData);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Помилка при завантаженні категорій");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (
    categoryKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Файл повинен бути зображенням");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Розмір файлу не повинен перевищувати 5MB");
      return;
    }

    setUploading(categoryKey);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("categoryKey", categoryKey);
    formData.append("image", file);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Помилка при завантаженні");
        return;
      }

      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
        setSuccess(`Фото для ${categories[categoryKey]?.name || categoryKey} успішно завантажено!`);
        setTimeout(() => setSuccess(null), 3000);
        
        if (fileInputRefs.current[categoryKey]) {
          fileInputRefs.current[categoryKey]!.value = "";
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Помилка підключення до сервера";
      setError(errorMessage);
    } finally {
      setUploading(null);
    }
  };

  const handleSaveCategory = async (categoryKey: string) => {
    setSaving(categoryKey);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("categoryKey", categoryKey);
    formData.append("action", "update");
    formData.append("name", editingData[categoryKey].name);
    formData.append("slug", editingData[categoryKey].slug);
    formData.append("description", editingData[categoryKey].description);
    formData.append("priority", editingData[categoryKey].priority.toString());

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        await fetchCategories();
        setEditingCategory(null);
        setSuccess(`Категорію успішно оновлено!`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Помилка при збереженні");
      }
    } catch {
      setError("Помилка підключення до сервера");
    } finally {
      setSaving(null);
    }
  };

  const handleDeleteCategory = async (categoryKey: string) => {
    if (!confirm(`Ви впевнені, що хочете видалити категорію "${categories[categoryKey]?.name || categoryKey}"?`)) {
      return;
    }

    setDeleting(categoryKey);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("categoryKey", categoryKey);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        await fetchCategories();
        setSuccess(`Категорію успішно видалено!`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Помилка при видаленні");
      }
    } catch {
      setError("Помилка підключення до сервера");
    } finally {
      setDeleting(null);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name || !newCategory.slug) {
      setError("Назва та slug обов&apos;язкові");
      return;
    }

    setSaving("new");
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("action", "create");
    formData.append("name", newCategory.name);
    formData.append("slug", newCategory.slug.toLowerCase());
    formData.append("description", newCategory.description);
    formData.append("priority", newCategory.priority.toString());

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        await fetchCategories();
        setShowAddForm(false);
        setNewCategory({ name: "", slug: "", description: "", priority: 0 });
        setSuccess(`Категорію успішно створено!`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Помилка при створенні");
      }
    } catch {
      setError("Помилка підключення до сервера");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Управління категоріями
              </h1>
              <p className="text-gray-600 mt-1">Додайте, редагуйте та видаляйте категорії</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Додати категорію
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
            <button onClick={() => setSuccess(null)} className="text-green-600 hover:text-green-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Add Category Form */}
      {showAddForm && (
        <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Додати нову категорію</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Назва категорії *</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Наприклад: Седани"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (унікальний ідентифікатор) *</label>
              <input
                type="text"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                placeholder="Наприклад: sedan"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-gray-500">Використовується в URL та для імпорту з Excel</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Опис категорії</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Опис категорії..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Пріоритет (менше = вище)</label>
              <input
                type="number"
                value={newCategory.priority}
                onChange={(e) => setNewCategory({ ...newCategory, priority: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-gray-500">Категорії з меншим пріоритетом відображаються першими</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateCategory}
                disabled={saving === "new"}
                className="px-6 py-3 bg-gradient-to-r from-brand to-brand-hover text-white font-semibold rounded-xl hover:from-brand-hover hover:to-brand transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving === "new" ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Створення...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Створити</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewCategory({ name: "", slug: "", description: "", priority: 0 });
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(categories)
          .filter((key) => key !== "main")
          .sort((a, b) => {
            const priorityA = categories[a].priority !== undefined ? categories[a].priority : 999;
            const priorityB = categories[b].priority !== undefined ? categories[b].priority : 999;
            return priorityA - priorityB;
          })
          .map((categoryKey) => {
          const category = categories[categoryKey];
          const isEditing = editingCategory === categoryKey;

          return (
            <div
              key={categoryKey}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                {!isEditing ? (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500">Slug: {category.slug || categoryKey}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(categoryKey);
                          setEditingData({
                            ...editingData,
                            [categoryKey]: {
                              name: category.name,
                              slug: category.slug || categoryKey,
                              description: category.description || "",
                              priority: category.priority !== undefined ? category.priority : 999,
                            },
                          });
                          }}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Редагувати"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(categoryKey)}
                          disabled={deleting === categoryKey}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Видалити"
                        >
                          {deleting === categoryKey ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Current Image Preview */}
                    {category.image && (
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Поточне фото:
                        </label>
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* File Input */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {category.image ? "Замінити фото" : "Додати фото"}
                      </label>
                      <input
                        ref={(el) => {
                          fileInputRefs.current[categoryKey] = el;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(categoryKey, e)}
                        disabled={uploading === categoryKey}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Підтримуються формати: JPG, PNG, WebP. Максимальний розмір: 5MB
                      </p>
                    </div>

                    {uploading === categoryKey && (
                      <div className="mt-4 flex items-center gap-2 text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800"></div>
                        <span className="text-sm">Завантаження...</span>
                      </div>
                    )}

                    {/* Description Display */}
                    {category.description && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Опис:
                        </label>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Назва категорії *</label>
                      <input
                        type="text"
                        value={editingData[categoryKey]?.name || ""}
                        onChange={(e) => setEditingData({
                          ...editingData,
                          [categoryKey]: { ...editingData[categoryKey], name: e.target.value },
                        })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
                      <input
                        type="text"
                        value={editingData[categoryKey]?.slug || ""}
                        onChange={(e) => setEditingData({
                          ...editingData,
                          [categoryKey]: { ...editingData[categoryKey], slug: e.target.value.toLowerCase().replace(/\s+/g, '-') },
                        })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      />
                      <p className="mt-1 text-xs text-gray-500">Використовується в URL та для імпорту з Excel</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Опис категорії</label>
                      <textarea
                        value={editingData[categoryKey]?.description || ""}
                        onChange={(e) => setEditingData({
                          ...editingData,
                          [categoryKey]: { ...editingData[categoryKey], description: e.target.value },
                        })}
                        placeholder="Опис категорії..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Пріоритет (менше = вище)</label>
                      <input
                        type="number"
                        value={editingData[categoryKey]?.priority !== undefined ? editingData[categoryKey].priority : 999}
                        onChange={(e) => setEditingData({
                          ...editingData,
                          [categoryKey]: { ...editingData[categoryKey], priority: parseInt(e.target.value) || 0 },
                        })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      />
                      <p className="mt-1 text-xs text-gray-500">Категорії з меншим пріоритетом відображаються першими</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSaveCategory(categoryKey)}
                        disabled={saving === categoryKey}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-brand to-brand-hover text-white font-semibold rounded-xl hover:from-brand-hover hover:to-brand transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {saving === categoryKey ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Збереження...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Зберегти</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
