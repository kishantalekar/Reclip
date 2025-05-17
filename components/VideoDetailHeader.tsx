"use client";
import { daysAgo } from "@/lib/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VideoDetailHeader = ({
  id,
  title,
  createdAt,
  userImg,
  username,
  videoId,
  ownerId,
  visibility,
  thumbnailUrl,
}: VideoDetailHeaderProps) => {
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("are you running");

    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
  };
  return (
    <header className="detail-header">
      <aside className="user-info">
        <h1>{title}</h1>
        <figure>
          <button onClick={() => router.push("/profile/" + ownerId)}>
            <Image
              src={userImg || ""}
              alt="user"
              width={24}
              height={24}
              className="rounded-full"
            />
            <h2>{username || "Guest"}</h2>
          </button>
          <figcaption>
            <span className="mt-1">⋅</span>
            <p>{daysAgo(createdAt)}</p>
          </figcaption>
        </figure>
      </aside>
      <aside className="cta">
        <button onClick={handleCopyLink}>
          <Image
            src={
              copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"
            }
            alt="link"
            width={24}
            height={24}
          />
        </button>
      </aside>
    </header>
  );
};

export default VideoDetailHeader;
