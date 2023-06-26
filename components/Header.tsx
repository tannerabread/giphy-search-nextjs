import { useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);
  const [imageWidth, setImageWidth] = useState<number | undefined>(
    undefined
  );

  const containerRef = useRef<HTMLDivElement>(null);

  function handleImageLoad(): void {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = (35 * width) / 440;
      setImageWidth(width);
      setImageHeight(height);
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <Image
        src="/giphy-logo.svg"
        alt="GIPHY Logo"
        className={styles.logo}
        width={imageWidth || 440}
        height={imageHeight || 35}
        onLoadingComplete={handleImageLoad}
      />
    </div>
  );
}
