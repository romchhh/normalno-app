import { revalidatePath } from "next/cache";

export function revalidateCarPages(carId?: number) {
  revalidatePath("/");
  revalidatePath("/catalog", "layout");
  if (carId != null) {
    revalidatePath(`/car/${carId}`);
  }
}
