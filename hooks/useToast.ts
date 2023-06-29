import { useState, useCallback, useRef, useEffect } from "react";

import { ToastType, ToastTypeTypes } from "@/components/Toast";

export function useToast() {
  const [toast, setToast] = useState<ToastType>({ active: false });
  const toastTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (
      message: string = "",
      type: ToastTypeTypes = "success",
      position = { x: 50, y: 50 },
      timeout: number = 5000
    ) => {
      if (toastTimeoutId.current) {
        clearTimeout(toastTimeoutId.current);
      }

      setToast({
        active: true,
        message,
        type,
        position,
      });

      toastTimeoutId.current = setTimeout(
        () => setToast({ active: false }),
        timeout
      );
    },
    []
  );

  useEffect(() => {
    
  }, []);

  return { toast, showToast };
}
