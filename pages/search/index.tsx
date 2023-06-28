import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Gif } from "../api/random";
import Display from "@/components/Display";
import Loading from "@/components/Loading";
import styles from "@/styles/search.module.css";

interface SearchState {
  gifs: Gif[];
  offset: number;
  term: string;
}

interface SearchStates {
  [key: string]: SearchState;
}

export default function Search() {
  const [searchStates, setSearchStates] = useState<SearchStates>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    if (q) {
      const initialSearchTerm = Array.isArray(q) ? q[0] : q;
      setSearchTerm(initialSearchTerm);
      setLoading(true);
      setTriggerFetch(true);
    }
  }, [q]);

  useEffect(() => {
    if (searchTerm && triggerFetch) {
      setLoading(true);
      fetchGifs();
      setTriggerFetch(false);
    }

    async function fetchGifs(): Promise<void> {
      const offset = searchStates[searchTerm]?.offset || 0;

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchTerm)}&offset=${offset}`
        );
        if (!res.ok) {
          console.error("Fetch failed: ", res);
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
        console.error("Fetch failed: ", err);
      } finally {
        setLoading(false);
      }
    }
  }, [searchTerm, searchStates, triggerFetch]);

  function loadMore(): void {
    const newState = { ...searchStates };
    if (newState[searchTerm]) {
      newState[searchTerm].offset += 50;
    }
    setSearchStates(newState);
    setTriggerFetch(true);
  }

  const gifs = searchStates[searchTerm]?.gifs || [];

  return gifs && gifs.length > 0 ? (
    <>
      <Display gifs={gifs} />
      <button className={styles.loadMoreButton} onClick={loadMore}>
        Load More
      </button>
    </>
  ) : loading ? (
    <Loading />
  ) : (
    <div className={styles.noResults}>
      <h2>No Results Found</h2>
      <p>Try searching for something else!</p>
    </div>
  );
}
