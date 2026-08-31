import { Suspense } from "react";
import LeadsClient from "./LeadsClient";

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
        </div>
      }
    >
      <LeadsClient />
    </Suspense>
  );
}
