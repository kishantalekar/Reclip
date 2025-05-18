"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> => {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Error uploading video");
    }
  });
};
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);
  useEffect(() => {
    if (video.duration !== null || 0) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

  useEffect(() => {
    const checkForRecordedVideo = async () => {
      try {
        const stored = sessionStorage.getItem("recordedVideo");
        if (!stored) return;
        const { url, name, type, duration } = JSON.parse(stored);
        const blob = await fetch(url).then((res) => res.blob());
        const file = new File([blob], name, { type, lastModified: Date.now() });

        if (video.inputRef.current) {
          const dateTransfer = new DataTransfer();
          dateTransfer.items.add(file);
          video.inputRef.current.files = dateTransfer.files;
          const event = new Event("change", { bubbles: true });
          video.inputRef.current.dispatchEvent(event);

          video.handleFileChange({
            target: {
              files: dateTransfer.files,
            },
          } as ChangeEvent<HTMLInputElement>);
        }
        if (duration) {
          setVideoDuration(duration);
        }

        sessionStorage.removeItem("recordedVideo");

        URL.revokeObjectURL(url);
      } catch (error) {
        console.log("error", error);
      }
    };
    checkForRecordedVideo();
  }, [video]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("Error");
    setIsSubmitting(true);
    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload a video and thumbnail");
        return;
      }
      if (!formData.title || !formData.description) {
        setError("Please fill in all the fields");
        return;
      }
      // 0 get upload url
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();
      if (!videoUploadUrl || !videoAccessKey) {
        throw new Error("Error uploading video");
      }
      //upload video to bunny

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      //upload the thumbnail to db
      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) {
        throw new Error("Error uploading thumbnail");
      }
      // attach thumbnail

      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      // create a new db entry for the video details (urls,data )
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      });
      router.push("/");
    } catch (error) {
      console.log("error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        className="rounded-20 shadow-20 gap-6 w-full flex flex-col px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a clear and concise title"
        />
        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe whats this video about"
          as="textarea"
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          as="select"
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Page;
