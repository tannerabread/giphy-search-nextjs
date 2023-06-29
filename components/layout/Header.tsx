import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/layout/Header.module.css";

export default function Header(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Link href="/">
          <Image
            src="/giphy-logo.png"
            alt="GIPHY Logo"
            className={styles.logo}
            fill
          />
        </Link>
      </div>
    </div>
  );
}
