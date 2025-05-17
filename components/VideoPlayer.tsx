import { createIframeLink } from "@/lib/utils/utils";

const VideoPlayer = ({ videoId }) => {
  console.log("videoId", videoId);
  return (
    <div className="video-player">
      <iframe
        src={createIframeLink(videoId)}
        loading="lazy"
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
        style={{
          border: 0,
          zIndex: 50,
        }}
      />
    </div>
  );
};

export default VideoPlayer;
