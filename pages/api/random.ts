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

  const url = new URL("https://api.giphy.com/v1/gifs/random");
  url.search = new URLSearchParams({
    api_key: apiKey,
    rating: '',
    tag: '',
  }).toString();

  try {
    const gifs = await Promise.all(
      Array(3)
        .fill(0)
        .map(() => fetchGifs(url))
    );
    res.status(200).json(gifs.flat() as Gif[]);
  } catch (error) {
    if (error === errors.rateLimitExceeded) {
      res
        .status(429)
        .json({ error: errors.rateLimitMessage });
    } else {
      res
        .status(500)
        .json({ error: errors.errorFetchingRandomGifs });
    }
  }
}
