import Image from "next/image";
import Link from "next/link";
import DropdownList from "./DropdownList";
import RecordScreen from "./RecordScreen";

const Header = ({ title, subHeader, userImg }: SharedHeaderProps) => {
  return (
    <header className="header">
      <section className="header-container">
        <div className="details">
          {userImg && (
            <Image
              src={userImg || "/assets/images/dummy.jpg"}
              alt="user"
              className="rounded-full"
              width={66}
              height={66}
            />
          )}
          <article>
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>
        <aside>
          <Link href={"/upload"}>
            <Image
              src={"/assets/icons/upload.svg"}
              alt={"upload"}
              width={16}
              height={16}
            />
            <span>Upload a video</span>
          </Link>
          <RecordScreen />
        </aside>
      </section>
      <section className="search-filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search for videos, tags, folders..."
          />
          <Image
            src={"/assets/icons/search.svg"}
            alt="Search"
            width={16}
            height={16}
          />
        </div>
        {<DropdownList />}
      </section>
    </header>
  );
};

export default Header;
