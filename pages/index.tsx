// Home page - shows 3 random gifs
import { useState, useEffect, useCallback } from "react";

import { useToast } from "@/hooks/useToast";
import { Gif } from "@/utils/giphy-api";
import { errors } from "@/utils/messages";

import Display from "@/components/layout/Display";
import Toast from "@/components/Toast";
import NoGifsFound from "@/components/errors/NoGifsFound";
import Loading from "@/components/Loading";

export default function Home(): JSX.Element {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast, showToast } = useToast();

  const fetchGifs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/random");
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error || errors.defaultServerError, "error");
        return;
      }
      const resGifs: Gif[] = await res.json();
      setGifs(resGifs);
    } catch (err) {
      console.error(errors.fetchFailed(err as Error));
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchGifs();
  }, [fetchGifs]);

  return loading ? (
    <Loading />
  ) : gifs.length > 0 ? (
    <>
      <Display gifs={gifs} />
      <Toast {...toast} />
    </>
  ) : (
    <>
      <NoGifsFound />
      <Toast {...toast} />
    </>
  );
}
