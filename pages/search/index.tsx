import { useState, useEffect, useCallback, MouseEvent } from "react";
import { useRouter } from "next/router";

import { useToast } from "@/hooks/useToast";
import { Gif } from "@/utils/giphy-api";
import { errors } from "@/utils/messages";
import { useSearches } from "@/contexts/SearchContext";

import Display from "@/components/layout/Display";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import NoGifsFound from "@/components/errors/NoGifsFound";

import styles from "@/styles/search.module.css";

export default function Search(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toastPosition, setToastPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const { toast, showToast } = useToast();
  const router = useRouter();
  const { q } = router.query;
  const { searchStates, updateSearchState, addSearch, updateSelectedSearch } =
    useSearches();

  const fetchGifs = useCallback(async () => {
    const offset = searchStates[searchTerm]?.offset || 0;

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}&offset=${offset}`
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data.error);
        showToast(
          data.error || errors.defaultServerError,
          "error",
          toastPosition
        );
        return;
      }
      const resGifs: Gif[] = await res.json();

      const newSearchState = {
        term: searchTerm,
        offset: offset + 50,
        gifs: searchStates[searchTerm]
          ? [...searchStates[searchTerm].gifs, ...resGifs]
          : resGifs,
      };
      updateSearchState(searchTerm, newSearchState);
    } catch (err) {
      console.error(errors.fetchFailed(err as Error));
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchStates, showToast, toastPosition, updateSearchState]);

  useEffect(() => {
    if (q) {
      const initialSearchTerm = Array.isArray(q) ? q[0] : q;
      setSearchTerm(initialSearchTerm);
      addSearch(initialSearchTerm);
      updateSelectedSearch(initialSearchTerm);
    }
  }, [q, addSearch, updateSelectedSearch]);

  useEffect(() => {
    if (
      searchTerm &&
      (!searchStates[searchTerm] || searchStates[searchTerm]?.gifs.length === 0)
    ) {
      setLoading(true);
      fetchGifs();
    }
  }, [searchTerm, searchStates, fetchGifs]);

  function loadMore(e: MouseEvent<HTMLButtonElement>): void {
    setToastPosition({ x: e.pageX - 100, y: e.pageY - 100 });
    const newSearchState = { ...searchStates[searchTerm] };
    if (newSearchState) {
      newSearchState.offset += 50;
    }
    updateSearchState(searchTerm, newSearchState);
    fetchGifs();
  }

  const gifs = searchStates[searchTerm]?.gifs || [];

  return loading ? (
    <Loading />
  ) : gifs.length > 0 ? (
    <>
      <Display gifs={gifs} />
      <button className={styles.loadMoreButton} onClick={loadMore}>
        Load More
      </button>
      <Toast {...toast} />
    </>
  ) : (
    <>
      <NoGifsFound />
      <Toast {...toast} />
    </>
  );
}
