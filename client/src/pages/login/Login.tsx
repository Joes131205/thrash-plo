import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { IcEmail, IcFacebookLog, IcGarbage, IcGoogleLog, IcLogoSmall, IcPassword, IcSeparatorLog } from "@/assets/icons";
import { useState } from "react";
import TextInput from "@/components/molecules/textInput/textInput";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";

export default function LoginPage() {
  const navigate = useNavigate();
  const isSmall = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.leftContent}>
          <img src={IcLogoSmall} alt="Logo ThrashPlo" style={{ marginBottom: 10, cursor: "pointer" }} onClick={() => navigate("/")} />
          <div>
            <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "32px" : "50px" }}>
              Selamat Datang Kembali
            </h2>
            <p className={styles.descMisi}>Masuk untuk mulai berkontribusi untuk Indonesia</p>
          </div>
          <div className={styles.sosmed}>
            <div style={{ padding: "12px 46px", border: "1.5px solid #D9D9D9", borderRadius: 12, cursor: "pointer" }} onClick={() => console.log("helo")}>
              <img src={IcGoogleLog} alt="Icon Google" />
            </div>
            <div style={{ padding: "12px 46px", border: "1.5px solid #D9D9D9", borderRadius: 12, cursor: "pointer" }} onClick={() => console.log("helo")}>
              <img src={IcFacebookLog} alt="Icon Google" />
            </div>
          </div>

          <img src={IcSeparatorLog} alt="" style={{ marginBottom: 27 }} />

          <div className={styles.boxInput}>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" icon={IcEmail} />
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" icon={IcPassword} password={true} />
            <div className={styles.checkboxRow}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className={styles.checkbox} onClick={() => handleCheckboxChange} />
                <p className={styles.rememberMe}>Ingat saya</p>
              </div>

              <a href="/lupa-password" className={styles.forgotPassword}>
                Lupa password?
              </a>
            </div>
          </div>

          <div style={{ width: "85%", marginTop: 40, textAlign: "center" }}>
            <ButtonMain btnText="Masuk" btnColor={true} textColor="white" />
            <p className={styles.registerText}>
              Belum punya akun?{" "}
              <a href="/register-warga" className={styles.registerLink}>
                Buat akun
              </a>
            </p>
          </div>
        </div>
        {/* END LEFT CONTENT */}

        {/* RIGHT CONTENT */}
        <div className={styles.rightContent}>
          <img src={IcGarbage} alt="Image Garbage" style={{ scale: 1.2 }} />
          <div className={styles.textContent}>
            <h4 className={styles.title}>Laporkan Sampah di Sekitarmu</h4>
            <p className={styles.desc}>Ambil langkah kecil untuk perubahan besar. Mulai dari laporanmu!</p>
          </div>
        </div>
        {/* END RIGHT CONTENT */}
      </div>
    </motion.div>
  );
}
