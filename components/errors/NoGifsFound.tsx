import Display from "@/components/layout/Display";

const searchUrl =
  "https://media2.giphy.com/media/3o6nURs60NHTOfXd72/giphy.mp4?cid=0ea41a78g5fhe9evetinypoh46buxl25dnzlmxzc2jgtkjkb&ep=v1_gifs_search&rid=giphy.mp4&ct=g";

const searchGif = [
  {
    id: "search",
    title: "Search",
    preview: searchUrl,
    url: searchUrl,
  },
];

export default function NoGifsFound(): JSX.Element {
  return <Display gifs={searchGif} />;
}
