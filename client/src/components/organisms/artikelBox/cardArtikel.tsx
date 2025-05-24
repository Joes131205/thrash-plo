import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../pages/artikel/Artikel.module.css";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import { IcCalendarMini, IcUserArtikel } from "@/assets/icons";

interface CardArtikelProps {
  image: string;
  title: string;
  date: string;
  author: string;
  description: string;
  onClick?: () => void;
}

const CardArtikel: React.FC<CardArtikelProps> = ({ image, title, date, author, description, onClick }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.cardArtikel}>
      <img src={image} alt="Image" />
      <h5 className={styles.titleArtikel}>{title}</h5>

      <div className={styles.listProps}>
        <div className={styles.props}>
          <img src={IcCalendarMini} alt="icon" style={{ width: 16 }} />
          <p className={styles.dateArtikel}>{date}</p>
        </div>

        <div className={styles.props}>
          <img src={IcUserArtikel} alt="icon" style={{ width: 16 }} />
          <p className={styles.dateArtikel}>{author}</p>
        </div>
      </div>

      <p className={styles.descArtikel}>{description}</p>

      <ButtonMain btnText={"Baca Lebih Lanjut"} btnColor={true} colorBorder={false} textColor={"default"} weightFont={true} isSmall={true} onClick={onClick ?? (() => navigate("/detail-artikel"))} />
    </div>
  );
};

export default CardArtikel;
