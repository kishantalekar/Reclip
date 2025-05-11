import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "../constants";

const page = () => {
  return (
    <main className="wrapper page">
      <Header subHeader={"Public Library"} title={"All Videos"} />
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...(card as VideoCardProps)} />
        ))}
      </section>
    </main>
  );
};

export default page;
