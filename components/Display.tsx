import { MouseEvent, useState, useEffect } from "react";

import { Gif } from "../pages/api/random";
import styles from "@/styles/Display.module.css";

interface Toast {
  active: boolean;
  message: string;
  position: {
    x: number;
    y: number;
  };
}

export default function Display({ gifs }: { gifs: Gif[] }) {
  const [activeGif, setActiveGif] = useState<Gif | null>(null);
  const [toast, setToast] = useState<Toast>({
    active: false,
    message: "",
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function openModal(gif: Gif): void {
    setActiveGif(gif);
  }

  function closeModal(): void {
    setActiveGif(null);
  }

  function copyUrl(e: MouseEvent<HTMLButtonElement>, url: string): void {
    navigator.clipboard.writeText(url);

    setToast({
      active: true,
      message: "URL Copied to Clipboard!",
      position: {
        x: e.pageX - 100,
        y: e.pageY - 100,
      },
    });

    setTimeout(
      () =>
        setToast({
          active: false,
          message: "",
          position: { x: 0, y: 0 },
        }),
      2000
    );
  }

  return (
    <div className={styles.gifContainer}>
      {gifs.map((gif) => (
        <div
          className={styles.card}
          key={gif.id}
          onClick={() => openModal(gif)}
        >
          <video autoPlay loop muted width={200} height={200}>
            <source src={gif.preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className={styles.copyButton}
            onClick={(e) => {
              e.stopPropagation();
              copyUrl(e, gif.url);
            }}
          >
            Copy URL
          </button>
        </div>
      ))}

      {activeGif && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalCloseButton} onClick={closeModal}>
              Close
            </button>
            <button
              className={styles.modalCopyButton}
              onClick={(e) => copyUrl(e, activeGif.url)}
            >
              Copy URL
            </button>
            <video autoPlay loop muted width={500} height={500}>
              <source src={activeGif.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {toast.active && (
        <div
          className={styles.toast}
          style={{
            top: `${toast.position.y}px`,
            left: `${toast.position.x}px`,
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
