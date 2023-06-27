import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Gif } from "../api/random";
import Display from "@/components/Display";

export default function Search() {
  // build search history in state and check for it before making a request
  const [gifs, setGifs] = useState<Gif[]>([]);
  const router = useRouter();
  const { q } = router.query;
  const searchTerm = Array.isArray(q) ? q[0] : q || "";

  useEffect(() => {
    async function fetchGifs() {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const resGifs: Gif[] = await res.json();
      setGifs(resGifs);
    }

    fetchGifs();
  }, [searchTerm]);

  if (!gifs) return <div>Loading...</div>;

  return <Display gifs={gifs} />;
}
