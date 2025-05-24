import { ImgLogo } from "@/assets/images";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import { useNavigate } from "react-router-dom";
import styleCss from "../../../pages/LandingPage/LandingPage.module.css";
import { Link } from "react-router-dom";

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    padding: "12px 25px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  listNavbar: {
    display: "flex",
    gap: "30px",
    cursor: "pointer",
  },

  listItemLink: {
    color: "var(--text-primary)",
    textDecoration: "none",
    transition: "color 0.3s",
    fontWeight: "var(--weight-medium)",
    fontSize: "var(--dp-18)",
  },

  btnContainer: {
    display: "flex",
    gap: "15px",
  },
};

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <img src={ImgLogo} alt="Logo ThrashPlo" style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
      <ul style={styles.listNavbar}>
        <li className={styleCss.listItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styleCss.listItem}>
          <Link to="/tentang-kami">Tentang Kami</Link>
        </li>
        <li className={styleCss.listItem}>
          <Link to="/artikel">Artikel</Link>
        </li>
        <li className={styleCss.listItem}>
          <Link to="/aksi-bersih">Aksi Bersih</Link>
        </li>
      </ul>
      <div style={styles.btnContainer}>
        <ButtonMain btnText={"Login"} btnColor={false} colorBorder={true} textColor={"default"} onClick={() => navigate("/login")} />
        <ButtonMain btnText={"Warga"} btnColor={true} colorBorder={false} textColor={"white"} onClick={() => navigate("/register-warga")} />
      </div>
    </div>
  );
}
