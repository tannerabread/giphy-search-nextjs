import { errors } from "./messages";

export type Gif = {
  id: string;
  title: string;
  preview: string;
  url: string;
};

export type APIError = {
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

export async function fetchGifs(url: string): Promise<Gif[] | APIError> {
  const response = await fetch(url);
  
  if (response.status === 429) {
  // if (response.status === 429) {
    throw new Error(errors.rateLimitExceeded);
  } else if (!response.ok) {
    throw new Error(errors.giphyApiRequestFailed);
  }

  const jsonResponse = await response.json();

  const gifs = Array.isArray(jsonResponse.data)
    ? jsonResponse.data
    : [jsonResponse.data];

  return gifs.map((gif: GiphyApiResponse) => ({
    id: gif.id,
    title: gif.title,
    preview: gif.images.preview.mp4,
    url: gif.images.original.mp4,
  }));
}
