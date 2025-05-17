import Image from "next/image";

const FileInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => {
  const reset = () => {};
  return (
    <section className="file-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={onChange}
        hidden
      />

      {!previewUrl ? (
        <figure onClick={() => inputRef.current?.click()}>
          <Image
            src={"/assets/icons/upload.svg"}
            alt="upload-icon"
            width={24}
            height={24}
          />
          <p>click to upload your {id}</p>
        </figure>
      ) : (
        <div>
          {type === "video" ? (
            <video src={previewUrl} controls />
          ) : (
            <Image src={previewUrl} alt="image" fill />
          )}
          <button type="button" onClick={reset}>
            <Image
              src={"/assets/icons/close.svg"}
              alt="reset"
              width={16}
              height={16}
            />
            <p>{file?.name}</p>
          </button>
        </div>
      )}
    </section>
  );
};

export default FileInput;
