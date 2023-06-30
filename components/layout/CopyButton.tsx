import { MouseEvent } from "react";

import styles from "@/styles/layout/CopyButton.module.css";

interface CopyButtonProps {
  isModal?: boolean;
  url: string;
  onCopy: (e: MouseEvent<HTMLButtonElement>, url: string) => void;
}

export default function CopyButton({
  isModal = false,
  url,
  onCopy,
}: CopyButtonProps): JSX.Element {
  return (
    <button
      className={`${styles.copyButton} ${
        isModal ? styles.modalCopyButton : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onCopy(e, url);
      }}
    >
      Copy URL
    </button>
  );
}
