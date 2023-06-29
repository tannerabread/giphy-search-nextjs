import { MouseEvent, useState, useEffect, useRef } from "react";

import { Gif } from "@/utils/giphy-api";
import { success } from "@/utils/messages";
import { useToast } from "@/hooks/useToast";

import Toast from "@/components/Toast";
import Modal from "@/components/layout/Modal";
import CopyButton from "@/components/layout/CopyButton";

import styles from "@/styles/layout/Display.module.css";

export default function Display({ gifs }: { gifs: Gif[] }): JSX.Element {
  const [activeGif, setActiveGif] = useState<Gif | null>(null);
  const { toast, showToast } = useToast();
  const gifRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const gif = entry.target as HTMLDivElement;
          const video = gif.querySelector("video");
          if (entry.isIntersecting) {
            if (video) {
              if (!video.src) {
                video.src = video.dataset.src || "";
              }
              video.play();
            }
          } else {
            if (video) video.pause();
          }
        });
      },
      { rootMargin: "500px" }
    );

    const current = gifRefs.current;

    current.forEach((gifRef) => {
      if (gifRef) observer.observe(gifRef);
    });

    return () => {
      if (current) {
        current.forEach((gifRef) => {
          if (gifRef) observer.unobserve(gifRef);
        });
      }
    };
  }, [gifs]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function openModal(gif: Gif): void {
    setActiveGif(gif);
  }

  function closeModal(): void {
    setActiveGif(null);
  }

  function copyUrl(e: MouseEvent<HTMLButtonElement>, url: string): void {
    navigator.clipboard.writeText(url);

    showToast(
      success.copiedToClipboard,
      "success",
      { x: e.pageX - 100, y: e.pageY - 100 },
      2000
    );
  }

  return (
    <div className={styles.gifContainer}>
      {gifs.map((gif, index) => (
        <div
          className={styles.card}
          key={gif.id}
          onClick={() => openModal(gif)}
          ref={(el) => (gifRefs.current[index] = el)}
        >
          <video
            autoPlay
            loop
            muted
            width={200}
            height={200}
            data-src={gif.preview}
          >
            Your browser does not support the video tag.
          </video>
          <CopyButton url={gif.url} onCopy={copyUrl} />
        </div>
      ))}

      {activeGif && (
        <Modal
          activeGif={activeGif}
          closeModal={closeModal}
          copyUrl={copyUrl}
        />
      )}

      <Toast {...toast} />
    </div>
  );
}
