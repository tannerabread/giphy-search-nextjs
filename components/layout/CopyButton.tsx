import { MouseEvent } from "react";

import styles from "@/styles/layout/CopyButton.module.css";

interface CopyButtonProps {
  url: string;
  onCopy: (e: MouseEvent<HTMLButtonElement>, url: string) => void;
}

export default function CopyButton({
  url,
  onCopy,
}: CopyButtonProps): JSX.Element {
  return (
    <button
      className={styles.copyButton}
      onClick={(e) => {
        e.stopPropagation();
        onCopy(e, url);
      }}
    >
      Copy URL
    </button>
  );
}
