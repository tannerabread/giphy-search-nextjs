import Display from "@/components/layout/Display";

const errorUrl =
  "https://media4.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.mp4?cid=0ea41a78ndg61oc7vilv4y4siyp23haaegcsjxomjzqbm4nn&ep=v1_gifs_search&rid=giphy.mp4&ct=g";

const errorGif = [
  {
    id: "error",
    title: "Error",
    preview: errorUrl,
    url: errorUrl,
  },
];

export default function Custom404(): JSX.Element {
  return <Display gifs={errorGif} />;
}
