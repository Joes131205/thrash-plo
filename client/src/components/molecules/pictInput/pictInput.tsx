import React, { useRef, useState } from "react";

type TextInputProps = {
  placeholder?: string;
  icon?: string;
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1.5px solid var(--stroke-secondary)",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "400px",
    width: "100%",
    gap: 11,
    justifyContent: "center",
    cursor: "pointer",
  },
  text: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "var(--stroke-secondary)",
    fontSize: "14px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  hiddenInput: {
    display: "none",
  },
};

export default function PictInput({ icon }: TextInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      {preview ? (
        <img src={preview} alt="Preview" style={styles.image} />
      ) : (
        <>
          {icon && <img src={icon} alt="icon" style={{ width: 24, height: 24 }} />}
          <p style={styles.text}>Logo Komunitas</p>
        </>
      )}
      <input type="file" accept="image/*" ref={fileInputRef} style={styles.hiddenInput} onChange={handleImageChange} />
    </div>
  );
}
