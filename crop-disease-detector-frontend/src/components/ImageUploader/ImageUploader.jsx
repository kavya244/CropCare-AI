
import { useRef, useEffect, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./ImageUploader.css";

export default function ImageUploader({ file, setFile }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="upload-box">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => {
          handleFile(e.target.files[0]);
          e.target.value = "";
        }}
      />

      {file && preview ? (
        <div className="preview-container">
          <img
            src={preview}
            alt="Selected crop leaf"
            className="image-preview"
          />

          <p className="selected-file-name">{file.name}</p>

          <div className="upload-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => inputRef.current?.click()}
            >
              Change Image
            </button>

            <button
              type="button"
              className="remove-image-btn"
              onClick={removeFile}
              aria-label="Remove image"
            >
              <X size={18} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="upload-icon">
            <Upload size={38} />
          </div>

          <h3>{t("uploadTitle")}</h3>
          <p>{t("uploadText")}</p>

          <button
            type="button"
            className="primary-btn"
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon size={18} />
            {t("choose")}
          </button>

          <small className="upload-hint">
            JPG, PNG or WEBP · Maximum 10 MB
          </small>
        </>
      )}

      {error && (
        <p className="upload-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
