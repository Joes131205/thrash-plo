import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Register.module.css";
import { IcGarbage, IcLogoSmall, IcEmail, IcPassword, IcEmoticon, IcTelephone, IcKTP } from "@/assets/icons";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import TextInput from "@/components/molecules/textInput/textInput";

export default function RegisterWarga() {
  const navigate = useNavigate();
  const isSmall = true;

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noKTP, setNoKTP] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={styles.wrapper}>
      <motion.div className={styles.motionWrapper} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
        <div className={styles.container}>
          {/* LEFT CONTENT */}
          <div className={styles.leftContent}>
            <img src={IcLogoSmall} alt="Logo ThrashPlo" style={{ marginBottom: 10, cursor: "pointer" }} onClick={() => navigate("/")} />
            <div>
              <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "32px" : "50px" }}>
                Bersama Mulai Perubahan!
              </h2>
              <p className={styles.descMisi}>Bersama wujudkan Indonesia bebas sampah</p>
            </div>

            <div className={styles.boxInput}>
              <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Lengkap" type="name" icon={IcEmoticon} />
              <TextInput value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Nomor Telepon" type="telephone" icon={IcTelephone} />
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" icon={IcEmail} />
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" icon={IcPassword} />
              <TextInput value={noKTP} onChange={(e) => setNoKTP(e.target.value)} placeholder="Nomor KTP" type="name" icon={IcKTP} />
            </div>

            <div className={styles.checkboxRow}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className={styles.checkbox} />
                <p className={styles.rememberMe}>
                  Saya udah membaca {""}
                  <a href="/" className={styles.registerLink}>
                    Syarat dan Ketentuan
                  </a>
                  yang berlaku
                </p>
              </div>
            </div>

            <div style={{ width: "85%", marginTop: 25, textAlign: "center", paddingBottom: 20 }}>
              <ButtonMain btnText="Daftar" btnColor={true} textColor="white" />
              <div>
                <p className={styles.registerText}>
                  Sudah punya akun?{" "}
                  <a href="/login" className={styles.registerLink}>
                    Masuk
                  </a>
                </p>
                <p className={styles.registerText}>
                  Anda adalah komunitas?{" "}
                  <a href="/register-komunitas" className={styles.registerLink}>
                    Daftar sebagai komunitas
                  </a>
                </p>
              </div>
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
    </div>
  );
}
