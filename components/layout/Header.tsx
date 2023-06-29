import Image from "next/image";

import styles from "@/styles/layout/Header.module.css";

export default function Header(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/giphy-logo.svg"
          alt="GIPHY Logo"
          className={styles.logo}
          fill
        />
      </div>
    </div>
  );
}
