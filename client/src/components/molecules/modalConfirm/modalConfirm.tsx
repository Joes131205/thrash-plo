import React from "react";

interface ModalConfirmationProps {
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

const styles = {
  containerModal: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  topContentModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 400,
    textAlign: "center" as const,
  },
  bottomContentModal: {
    width: "100%",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 30,
    display: "flex",
    justifyContent: "space-around",
    gap: 50,
  },
  btnCancel: {
    padding: "8px 16px",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3D3D3D",
    color: "#fff",
    flex: 1,
  },
  btnLogout: {
    padding: "8px 16px",
    borderRadius: 5,
    border: "none",
    backgroundColor: "#d33",
    color: "#fff",
    cursor: "pointer",
    flex: 1,
  },
};

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ title = "Konfirmasi", message = "Apakah Anda yakin?", onCancel, onConfirm, cancelLabel = "Batal", confirmLabel = "Keluar" }) => {
  return (
    <div style={styles.containerModal}>
      <div style={styles.topContentModal}>
        <h3 style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>{title}</h3>
        <p>{message}</p>
        <div style={styles.bottomContentModal}>
          <button onClick={onCancel} style={styles.btnCancel}>
            {cancelLabel}
          </button>
          <button onClick={onConfirm} style={styles.btnLogout}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
