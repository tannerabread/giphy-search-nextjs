// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Gif, Error, GiphyApiResponse } from "./random";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Gif[] | Error>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  } else {
    const apiKey = process.env.GIPHY_API_KEY;
    const { q } = req.query;
    const searchTerm = Array.isArray(q) ? q[0] : q || "";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
      searchTerm
    )}&limit=50&rating=&lang=en`;

    if (!apiKey) {
      res.status(500).json({ error: "Missing Giphy API key" });
      return;
    }

    try {
      const respnose = await fetch(url);
      const jsonResponse = await respnose.json();
      const gifs = jsonResponse.data;

      const gifUrls: Gif[] = gifs.map((gif: GiphyApiResponse) => ({
        id: gif.id,
        title: gif.title,
        preview: gif.images.preview.mp4,
        url: gif.images.original.mp4,
      }));

      res.status(200).json(gifUrls);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching searched GIFs from Giphy API" });
    }
  }
}
