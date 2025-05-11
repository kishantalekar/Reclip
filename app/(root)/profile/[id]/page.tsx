import { dummyCards } from "@/app/constants";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";

const page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader={"kishantalekar024@gmail.com"}
        title={"Kishan"}
        userImg="/assets/images/dummy.jpg"
      />
      <h1 className="text-2xl font-karla">User id : {id}</h1>
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...(card as VideoCardProps)} />
        ))}
      </section>
    </div>
  );
};

export default page;
