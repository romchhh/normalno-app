export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureCarSchema } = await import("@/lib/db");
    await ensureCarSchema();
  }
}
