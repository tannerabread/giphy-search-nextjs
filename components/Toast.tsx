import styles from "@/styles/Toast.module.css";

export type ToastTypeTypes = "success" | "error";

export interface ToastType {
  active: boolean;
  message?: string;
  type?: ToastTypeTypes;
  position?: {
    x: number;
    y: number;
  };
}

export default function Toast({
  active = false,
  message = "",
  type = "success",
  position,
}: ToastType): JSX.Element | null {
  const xPos = position?.x ?? 50;
  const yPos = position?.y ?? 50;

  return active ? (
    <div
      role="alert"
      aria-live="assertive"
      className={`${styles.toast} ${styles[type]}`}
      style={{
        top: `${yPos}px`,
        left: `${xPos}px`,
      }}
    >
      {message}
    </div>
  ) : null;
}
