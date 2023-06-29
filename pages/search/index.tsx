import { useState, useEffect, useCallback, MouseEvent } from "react";
import { useRouter } from "next/router";

import { useToast } from "@/hooks/useToast";
import { Gif } from "@/utils/giphy-api";
import { errors } from "@/utils/messages";

import Display from "@/components/layout/Display";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import NoGifsFound from "@/components/errors/NoGifsFound";

import styles from "@/styles/search.module.css";

interface SearchState {
  gifs: Gif[];
  offset: number;
  term: string;
}

interface SearchStates {
  [key: string]: SearchState;
}

export default function Search(): JSX.Element {
  const [searchStates, setSearchStates] = useState<SearchStates>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const [toastPosition, setToastPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const { toast, showToast } = useToast();
  const router = useRouter();
  const { q } = router.query;

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

      setSearchStates((states) => ({
        ...states,
        [searchTerm]: {
          term: searchTerm,
          offset: offset + 50,
          gifs: states[searchTerm]
            ? [...states[searchTerm].gifs, ...resGifs]
            : resGifs,
        },
      }));
    } catch (err) {
      console.error(errors.fetchFailed(err as Error));
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchStates, showToast, toastPosition]);

  useEffect(() => {
    if (q) {
      const initialSearchTerm = Array.isArray(q) ? q[0] : q;
      setSearchTerm(initialSearchTerm);
      setTriggerFetch(true);
    }
  }, [q]);

  useEffect(() => {
    if (searchTerm && triggerFetch) {
      if (!searchStates[searchTerm]) {
        setLoading(true);
      }
      fetchGifs();
      setToastPosition({ x: 50, y: 50 });
      setTriggerFetch(false);
    }
  }, [searchTerm, searchStates, triggerFetch, fetchGifs]);

  function loadMore(e: MouseEvent<HTMLButtonElement>): void {
    setToastPosition({ x: e.pageX - 100, y: e.pageY - 100 });
    const newState = { ...searchStates };
    if (newState[searchTerm]) {
      newState[searchTerm].offset += 50;
    }
    setSearchStates(newState);
    setTriggerFetch(true);
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
