import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../pages/aksiBersih/AksiBersih.module.css";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import { IcCalendarMini, IcCheckStatus, IcMapMini, IcVolunteer } from "@/assets/icons";

interface CardAksiProps {
  imageSrc: string;
  title: string;
  date: string;
  location: string;
  volunteerCount: string;
  status: string;
  organizer: string;
  onDetailClick?: () => void;
}

const CardAksi: React.FC<CardAksiProps> = ({ imageSrc, title, date, location, volunteerCount, status, organizer, onDetailClick }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.boxAksi}>
      <div className={styles.boxImg}>
        <img src={imageSrc} alt="Image Aksi" />
      </div>
      <div className={styles.textContent}>
        <h6 className={`${styles.titleAksi} ${styles.small}`}>{title}</h6>

        <div className={styles.boxList}>
          <div className={styles.listProps}>
            <div className={styles.boxProperties}>
              <img src={IcCalendarMini} alt="Icon Calendar" />
              <p className={styles.textProp}>{date}</p>
            </div>
            <div className={styles.boxProperties}>
              <img src={IcMapMini} alt="Icon Map" />
              <p className={styles.textProp}>{location}</p>
            </div>
          </div>
          <div className={styles.listProps}>
            <div className={styles.boxProperties}>
              <img src={IcVolunteer} alt="Icon Volunteer" />
              <p className={styles.textProp}>{volunteerCount}</p>
            </div>
            <div className={styles.boxProperties}>
              <img src={IcCheckStatus} alt="Icon Check" />
              <p className={styles.textProp}>{status}</p>
            </div>
          </div>
        </div>

        <div className={styles.buttonContent}>
          <p className={styles.textProp}>
            Diselenggarakan Oleh <span>{organizer}</span>
          </p>
          <ButtonMain btnText={"Lihat Selengkapnya"} btnColor={true} colorBorder={false} textColor={"default"} weightFont={true} onClick={onDetailClick || (() => navigate("/detail-aksi"))} />
        </div>
      </div>
    </div>
  );
};

export default CardAksi;
