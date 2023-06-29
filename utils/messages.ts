export const errors = {
  missingGiphyApiKey: "Missing Giphy API key",
  giphyApiRequestFailed: "Giphy API request failed",
  rateLimitExceeded: "Rate limit exceeded",
  rateLimitMessage:
    "Rate limit for Giphy API has been exceeded. You can still view previously searched gifs.",
  defaultServerError: "Something went wrong on the server",
  errorFetchingRandomGifs: "Error fetching random GIFs from Giphy API",
  searchTermError: (searchTerm: string | undefined) =>
    `Error fetching GIFs from Giphy API for term ${searchTerm}`,
  methodNotAllowed: (method: string | undefined) =>
    `Method ${method} Not Allowed`,
  fetchFailed: (err: Error) => `Fetch failed: ${err.message}`,
};

export const success = {
  copiedToClipboard: "URL Copied to clipboard!",
};
