import { ReactNode } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/Layout.module.css";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  function handleSearch(value: string) {
    console.log("Searching for: ", value);
  }

  return (
    <>
      <Head>
        <title>GIPHY Search</title>
        <meta name="description" content="Generated by Bannon Tanner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.headersearch}>
          <Header />
          <SearchBar onSearch={handleSearch} />
        </div>
        {children}
      </main>
    </>
  );
}