import "@/styles/globals.css";
import type { AppProps } from "next/app";

import ErrorBoundary from "@/components/errors/ErrorBoundary";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
