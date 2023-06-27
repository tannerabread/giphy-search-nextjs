// Home page - shows 3 random gifs
import { useState, useEffect } from "react";
import { Gif } from "./api/random";
import Display from "@/components/Display";

export default function Home() {
  const [gifs, setGifs] = useState<Gif[]>([]);

  useEffect(() => {
    async function fetchGifs() {
      const res = await fetch("/api/random");
      const resGifs: Gif[] = await res.json();
      setGifs(resGifs);
    }

    fetchGifs();
  }, []);

  if (!gifs) return <div>Loading...</div>;

  return <Display gifs={gifs} />;
}
