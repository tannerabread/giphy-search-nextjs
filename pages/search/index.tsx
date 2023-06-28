import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Gif } from "../api/random";
import Display from "@/components/Display";

export default function Search() {
  // build search history in state and check for it before making a request
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { q } = router.query;
  const searchTerm = Array.isArray(q) ? q[0] : q || "";

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      fetchGifs();
    }

    async function fetchGifs() {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const resGifs: Gif[] = await res.json();
      console.log(resGifs);
      setGifs(resGifs);
      setLoading(false);
    }
  }, [searchTerm]);

  const loadingGifUrl =
    "https://media0.giphy.com/media/FaAxdPWZ7HKGmlnku7/giphy.mp4?cid=0ea41a78kak8meeemtj118irlu8843sll1q9us2aa7bej8pu&ep=v1_gifs_search&rid=giphy.mp4&ct=g";
  const loadingGif = [
    {
      id: "loading",
      title: "Loading...",
      preview: loadingGifUrl,
      url: loadingGifUrl,
    },
  ];

  return (
    <>
      {loading ? (
        <Display gifs={loadingGif} />
      ) : gifs && gifs.length > 0 ? (
        <Display gifs={gifs} />
      ) : (
        <div>No results found for {searchTerm}</div>
      )}
    </>
  );
}
