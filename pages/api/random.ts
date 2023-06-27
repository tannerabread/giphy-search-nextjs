// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type Gif = {
  id: string;
  title: string;
  preview: string;
  url: string;
};

export type Error = {
  error: string;
};

export type GiphyApiResponse = {
  id: string;
  title: string;
  images: {
    preview: {
      mp4: string;
    };
    original: {
      mp4: string;
    };
  };
};

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
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=`;

    if (!apiKey) {
      res.status(500).json({ error: "Missing Giphy API key" });
      return;
    }

    try {
      const responses = await Promise.all(
        Array(3)
          .fill(0)
          .map(() => fetch(url))
      );
      const jsonResponses = await Promise.all(
        responses.map((res) => {
          if (!res.ok) {
            throw new Error(`API responded with status code ${res.status}`);
          }
          return res.json();
        })
      );
      const gifs = jsonResponses.map((jsonResponse) => jsonResponse.data);

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
        .json({ error: "Error fetching random GIFs from Giphy API" });
    }
  }
}
