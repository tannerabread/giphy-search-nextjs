import Display from "./layout/Display";

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

export default function Loading(): JSX.Element {
  return <Display gifs={loadingGif} />;
}
