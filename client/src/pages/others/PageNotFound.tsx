import { IcDecorBottom, IcDecorTop } from "@/assets/icons";
import styles from "./NotFound.module.css";

export default function Error404() {
  return (
    <div className={styles.content}>
      <img src={IcDecorTop} alt="Top Decoration" className={styles.decorTop} />
      <p className={styles.number}>404</p>
      <p className={styles.text}>Page Not Found</p>
      <img src={IcDecorBottom} alt="Bottom Decoration" className={styles.decorBottom} />
    </div>
  );
}
