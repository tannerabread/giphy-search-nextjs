import type { NextApiRequest, NextApiResponse } from "next";

import { Gif, APIError, fetchGifs } from "@/utils/giphy-api";
import { errors } from "@/utils/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Gif[] | APIError>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end(errors.methodNotAllowed(req.method));
    return;
  }

  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: errors.missingGiphyApiKey });
    return;
  }

  const { q, offset } = req.query;
  const searchTerm = Array.isArray(q) ? q[0] : q || "";
  const offsetValue = Array.isArray(offset) ? offset[0] : offset || "0";

  const url = new URL("https://api.giphy.com/v1/gifs/search");
  const params = {
    api_key: apiKey,
    q: searchTerm,
    offset: offsetValue,
    limit: "50",
    rating: "",
    lang: "en",
  };
  url.search = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  try {
    const gifs = await fetchGifs(url);
    Array.isArray(gifs)
      ? res.status(200).json(gifs)
      : res.status(500).json(gifs);
  } catch (error) {
    console.log(error as Error);
    if ((error as Error).message === errors.rateLimitExceeded) {
      res.status(429).json({ error: errors.rateLimitMessage });
    } else {
      res.status(500).json({
        error: errors.searchTermError(searchTerm),
      });
    }
  }
}
