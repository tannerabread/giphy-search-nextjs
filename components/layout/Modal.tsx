import { MouseEvent } from "react";

import { Gif } from "@/utils/giphy-api";

import CopyButton from "@/components/layout/CopyButton";
import styles from "@/styles/layout/Modal.module.css";

interface ModalProps {
  activeGif: Gif;
  closeModal: () => void;
  copyUrl: (e: MouseEvent<HTMLButtonElement>, url: string) => void;
}

export default function Modal({
  activeGif,
  closeModal,
  copyUrl,
}: ModalProps): JSX.Element {
  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={closeModal}>
          Close
        </button>
        <CopyButton isModal url={activeGif.url} onCopy={copyUrl} />
        <video autoPlay loop muted width={500} height={500}>
          <source src={activeGif.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
