import React, { useState, useRef, useEffect } from "react";
import { MakeModalUploadProps } from "../../etc/TypeColletion";
import useAlert from "../../hooks/useAlert";
import usefileUpload from "../../hooks/usefileUpload";
import styles from "./FloatingMenu.module.css";
import MakeModalPreview from "./MakeModalPreview";
import MakeModalWrite from "./MakeModalWrite";

const MakeModalUpload = () => {
  const [uploadedImages, setUploadedImages] = usefileUpload({
    list: [],
    max: 4,
  });
  const [uploadAlert, setUploadAlert] = useAlert(false);
  const uploadBoxRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const changeHandler = (e: any) => {
      const files = e.target.files;
      if (files.length > 4 || uploadedImages.length > 3) {
        setUploadAlert();
        return;
      }
      setUploadedImages(files);
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer !== null) {
        const files = e.dataTransfer.files;
        if (files.length > 4 || uploadedImages.length > 3) {
          setUploadAlert();
          return;
        }
        setUploadedImages(files);
      }
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    uploadBox?.addEventListener("drop", dropHandler);
    uploadBox?.addEventListener("dragover", dragOverHandler);
    input?.addEventListener("change", changeHandler);

    return () => {
      uploadBox?.removeEventListener("drop", dropHandler);
      uploadBox?.removeEventListener("dragover", dragOverHandler);
      input?.removeEventListener("change", changeHandler);
    };
  }, [uploadedImages]);

  return (
    <div
      className={
        uploadedImages.length < 1
          ? styles.imageUploadBox
          : styles.imagePreviewBox
      }
    >
      {uploadedImages.length > 0 ? (
        <MakeModalPreview />
      ) : (
        <label htmlFor="" className={styles.dragUploadBox} ref={uploadBoxRef}>
          <div className={styles.iconBox}>
            <img
              className={styles.uploadIcon}
              src={process.env.PUBLIC_URL + `/assets/uploadIcon.png`}
            />
          </div>
          <div className={styles.textBox}>
            <h3>????????? ????????? ????????? ????????????</h3>
            <span>?????? 5???, ????????? ???mb??????</span>
          </div>
        </label>
      )}
      <label
        htmlFor="fileUpload"
        className={
          uploadedImages.length < 1
            ? styles.fileUploadLabel
            : styles.uploadLabelChange
        }
      >
        {uploadedImages.length < 1 ? (
          "??????????????? ??????"
        ) : (
          <img src={process.env.PUBLIC_URL + `/assets/fileUploadIcon.png`} />
        )}
      </label>
      <input
        className={styles.uploadInput}
        type="file"
        id="fileUpload"
        multiple
        accept="image/*"
        ref={inputRef}
      />
      <div
        className={`${styles.uploadAlert} ${
          uploadAlert && styles.uploadAlertOff
        }`}
      >
        <p>???????????? ?????? 5???????????? ???????????????</p>
      </div>
    </div>
  );
};

export default MakeModalUpload;
