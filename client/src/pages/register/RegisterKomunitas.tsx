import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Register.module.css";
import { IcLogoSmall, IcEmail, IcPassword, IcEmoticon, IcTelephone, IcPartner, IcPerson, IcMappin, IcPen, IcListNumber, IcPencil, IcPlus } from "@/assets/icons";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import TextInput from "@/components/molecules/textInput/textInput";
import PictInput from "@/components/molecules/pictInput/pictInput";

export default function RegisterKomunitas() {
  const navigate = useNavigate();
  const isSmall = true;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [penanggungJawab, setPenanggungJawab] = useState("");
  const [telephone, setTelephone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tahun, setTahun] = useState("");

  const [jmlAnggota, setJmlAnggota] = useState("");
  const [desc, setDesc] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const StepOne = () => {
    return (
      <>
        {/* <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 1 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}> */}
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Komunitas" type="name" icon={IcEmoticon} />
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Komunitas" type="email" icon={IcEmail} />
        <TextInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" icon={IcPassword} />
        {/* </motion.div> */}
      </>
    );
  };

  const StepTwo = () => {
    return (
      <>
        {/* <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.8 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}> */}
        <TextInput value={penanggungJawab} onChange={(e) => setPenanggungJawab(e.target.value)} placeholder="Nama Komunitas" type="name" icon={IcPerson} />
        <TextInput value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Nomor Telepon" type="telephone" icon={IcTelephone} />
        <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Alamat Komunitas" type="alamat" icon={IcMappin} />
        <TextInput value={tahun} onChange={(e) => setTahun(e.target.value)} placeholder="Tahun Berdiri" type="tahun" icon={IcPen} />
        {/* </motion.div> */}
      </>
    );
  };

  const StepThree = () => {
    return (
      <>
        {/* <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.8 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}> */}
        <TextInput value={jmlAnggota} onChange={(e) => setJmlAnggota(e.target.value)} placeholder="Jumlah Anggota Komunitas" type="anggota" icon={IcListNumber} />
        <TextInput value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Deskripsi Singkat Komunitas" type="email" icon={IcPencil} />
        <PictInput icon={IcPlus} placeholder="Logo Komunitas" isShowLabel={false} value={logo} onChange={(val) => setLogo(val)} />
        {/* </motion.div> */}
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <motion.div className={styles.motionWrapper} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
        <div className={styles.container}>
          {/* LEFT CONTENT */}
          <div className={styles.leftContent}>
            <img src={IcLogoSmall} alt="Logo ThrashPlo" style={{ marginBottom: 10, cursor: "pointer" }} onClick={() => navigate("/")} />
            <div>
              <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "32px" : "50px" }}>
                Daftarkan Komunitasmu!
              </h2>
              <p className={styles.descMisi}>Mulai aksi bersih hari ini dan jadilah bagian dari perubahan</p>
            </div>

            <div className={styles.boxInput}>
              {currentStep === 1 && <StepOne />}
              {currentStep === 2 && <StepTwo />}
              {currentStep === 3 && <StepThree />}
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

            <div style={{ width: "85%", marginTop: 35, textAlign: "center", paddingBottom: 20 }}>
              <div className={styles.navigationButtons}>
                {currentStep < 3 ? (
                  <>
                    {currentStep > 1 && <ButtonMain btnText="Kembali" btnColor={true} textColor="white" onClick={prevStep} />}
                    <ButtonMain btnText="Lanjut" btnColor={true} textColor="white" onClick={nextStep} />
                  </>
                ) : (
                  <ButtonMain btnText="Daftar" btnColor={true} textColor="white" fullWidth />
                )}
              </div>

              <div>
                <p className={styles.registerText}>
                  Sudah punya akun?{" "}
                  <a href="/login" className={styles.registerLink}>
                    Masuk
                  </a>
                </p>
              </div>
            </div>
          </div>
          {/* END LEFT CONTENT */}

          {/* RIGHT CONTENT */}
          <div className={styles.rightContent}>
            <img src={IcPartner} alt="Image Garbage" style={{ scale: 1.2 }} />
            <div className={styles.textContent}>
              <h4 className={styles.title}>Gabungkan Kekuatan Bersama!</h4>
              <p className={styles.desc}>Kelola laporan dan rencanakan aksi bersih dari sini</p>
            </div>
          </div>
          {/* END RIGHT CONTENT */}
        </div>
      </motion.div>
    </div>
  );
}
