"use client";
import { ICONS } from "@/constants";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const RecordScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    resetRecording,
    startRecording,
    stopRecording,
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
  } = useScreenRecording();

  const closeModal = () => {
    setIsOpen(false);
    stopRecording();
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    await resetRecording();
    await startRecording();

    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  };

  const goToUpload = async () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    );
    router.push("/upload");
    closeModal();
  };
  return (
    <div className="record">
      <button className="primary-btn" onClick={() => setIsOpen(true)}>
        <Image src={ICONS.record} alt="record" width={16} height={16} />
        <span>Record a video</span>
      </button>
      {isOpen && (
        <section className="dialog">
          <div className="overlay-record" onClick={closeModal} />
          <div className="dialog-content">
            <figure>
              <h3>Screen Recording</h3>
              <button onClick={closeModal}>
                <Image alt="close" src={ICONS.close} width={20} height={20} />
              </button>
            </figure>
            <section>
              {isRecording ? (
                <article>
                  <div />
                  <span>Recording in progress</span>
                </article>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls />
              ) : (
                <p>Click Record to start Capturing</p>
              )}
            </section>
            <div className="record-box">
              {!isRecording && !recordedVideoUrl && (
                <button onClick={handleStartRecording} className="record-start">
                  <Image
                    src={ICONS.record}
                    alt="record"
                    width={16}
                    height={16}
                  />
                  <span>Record</span>
                </button>
              )}

              {isRecording && (
                <button className="record-stop" onClick={stopRecording}>
                  <Image src={ICONS.record} alt="stop" width={16} height={16} />
                  <span>Record Stop</span>
                </button>
              )}

              {recordedVideoUrl && (
                <>
                  <button onClick={recordAgain} className="record-again">
                    Record Again
                  </button>
                  <button onClick={goToUpload} className="record-upload">
                    <Image
                      src={ICONS.upload}
                      alt="upload"
                      width={16}
                      height={16}
                    />
                    continue to upload
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;
