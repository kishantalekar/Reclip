import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { getAllVideos } from "@/lib/actions/video";

const page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = await searchParams;

  const { videos, pagination } = await getAllVideos(
    query,
    filter,
    Number(page) || 1
  );
  console.log(videos[0].video);
  // const allVideos = videos.map((video) => {
  //   return {
  //     id: video.video.id,
  //     title: video.video.title,
  //     userImg: video.user?.image,
  //     user: video.user?.name,
  //     createdAt: video.video.createdAt,
  //     duration: video.video.duration,
  //     views: video.video.views,
  //     thumbnail: video.video.thumbnailUrl,
  //     visibility: video.video.visibility,
  //   };
  // });
  return (
    <main className="wrapper page">
      <Header subHeader={"Public Library"} title={"All Videos"} />
      {videos.length > 0 ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              {...video}
              thumbnail={video.thumbnailUrl}
              userImg={user?.image || "/assets/images/dummy.jpg"}
              username={user?.name || "guest"}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No videos found"
          description="Upload a video to get started"
        />
      )}
    </main>
  );
};

export default page;
