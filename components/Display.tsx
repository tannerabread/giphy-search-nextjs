import { Gif } from "../pages/api/random";
import styles from "@/styles/Display.module.css";

export default function Display({ gifs }: { gifs: Gif[] }) {
  console.log(gifs);

  return (
    <div className={styles.gifContainer}>
      {gifs.map((gif) => (
        <div className={styles.card} key={gif.id}>
          <video autoPlay loop muted width={500} height={500}>
            <source src={gif.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
