import React, { useState, type ChangeEvent } from "react";
import ImagePreview from "./ImagePreview";
import ErrorMessage from "./ErrorMessage";

interface ImageFilePickerProps {
  value: string;
  setImageBase: (base64String: string) => void;
  errorMessage?: string;
}

const ImageFilePicker = ({
  value,
  setImageBase,
  errorMessage,
}: ImageFilePickerProps) => {
  const [imagePreview, setImagePreview] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1000000) {
        // 1 МБ = 1048576 байтів
        setError("Файл перевищує розмір 1 МБ.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setImagePreview(base64String);
        setImageBase(base64String);
        setError(null); // Очищення помилки, якщо завантаження успішне
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      {Boolean(error) && <ErrorMessage message={error ?? ""} />}
      {Boolean(errorMessage) && <ErrorMessage message={errorMessage ?? ""} />}
      {imagePreview ? (
        <ImagePreview src={imagePreview} isBig />
      ) : (
        <div className="h-[40rem] w-[30rem] rounded-xl border-2 border-dashed border-orange-300"></div>
      )}
    </div>
  );
};

export default ImageFilePicker;
