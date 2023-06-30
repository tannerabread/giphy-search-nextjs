import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SearchProvider } from "@/contexts/SearchContext";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </ErrorBoundary>
  );
}
