import { MouseEvent } from "react";

import styles from "@/styles/layout/CopyButton.module.css";

export default function CopyButton({
  url,
  onCopy,
}: {
  url: string;
  onCopy: (e: MouseEvent<HTMLButtonElement>, url: string) => void;
}): JSX.Element {
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
