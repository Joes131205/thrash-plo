import React from "react";

interface ModalConfirmProps {
  isOpen: boolean;
  icon: string;
  questionText: string;
  onClose?: () => void;
  onConfirm: () => void;
  isConfirm: boolean;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpen, onClose, onConfirm, isConfirm, icon, questionText }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <img src={icon} alt="Icon" style={{ width: "120px" }} />
        <p style={styles.text}>{questionText}</p>
        <div style={styles.buttonGroup}>
          {isConfirm ? (
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 15 }}>
              <button style={{ ...styles.button, ...styles.cancel }} onClick={onClose}>
                Tidak
              </button>
              <button style={{ ...styles.button, ...styles.confirm }} onClick={onConfirm}>
                Iya, saya mau
              </button>
            </div>
          ) : (
            <button style={{ ...styles.button, ...styles.confirm }} onClick={onConfirm}>
              Kembali
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "var(--primary-color)",
    padding: "24px 30px",
    borderRadius: 12,
    width: "450px",
    maxWidth: "90%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
    color: "var(--text-primary)",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    padding: "0px 15px",
  },
  button: {
    padding: "10px 25px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
    flex: 1,
  },
  cancel: {
    backgroundColor: "var(--text-primary)",
    color: "var(--primary-color)",
  },
  confirm: {
    backgroundColor: "#2CD789",
    color: "var(--primary-color)",
  },
};

export default ModalConfirm;
