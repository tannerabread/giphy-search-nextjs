import Image from "next/image";
import styles from "@/styles/Header.module.css";

export default function Header() {
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
