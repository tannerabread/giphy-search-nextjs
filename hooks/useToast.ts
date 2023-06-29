import { useState, useCallback } from "react";

import { ToastType } from "@/components/Toast";

export function useToast() {
  const [toast, setToast] = useState<ToastType>({ active: false });

  const showToast = useCallback(
    (
      message: string,
      type: "error" | "success",
      position = { x: 50, y: 50 },
      timeout: number = 5000
    ) => {
      setToast({
        active: true,
        message,
        type,
        position,
      });

      const toastTimeout = setTimeout(() => setToast({ active: false }), timeout);

      return () => clearTimeout(toastTimeout);
    },
    []
  );

  return { toast, showToast };
}
