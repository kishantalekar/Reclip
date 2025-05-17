import { ChangeEvent, useRef, useState } from "react";

export const useFileInput = (maxSize: number) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSize) {
      alert("File size exceeded");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    if (file.type.startsWith("video")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        if (isFinite(video.duration) && video.duration > 0) {
          setDuration(Math.round(video.duration));
        } else {
          setDuration(0);
        }
        URL.revokeObjectURL(objectUrl);
      };
      video.src = objectUrl;
    }
  };
  const resetFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
    setFile(null);
    setDuration(0);
    if (inputRef.current) inputRef.current.value = "";
  };
  return {
    handleFileChange,
    resetFile,

    file,
    previewUrl,
    duration,
    inputRef,
  };
};
