"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const handleSignIn = async () => {
    return await authClient.signIn.social({ provider: "google" });
    // if (error) {
    //   console.error(error);
    // }
  };
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({
                length: 5,
              }).map((_, i) => (
                <Image
                  src={"/assets/icons/star.svg"}
                  alt="star"
                  width={20}
                  height={20}
                  key={i}
                />
              ))}
            </figure>
            <p>Snap cast makes screen recording easy</p>
            <article>
              <Image
                src={"/assets/images/jason.png"}
                alt="quote"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2>Jason</h2>
                <p>Product designer at Google</p>
              </div>
            </article>
          </section>
        </div>
        <p>© SnapCast {new Date().getFullYear()} All rights reserved.</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href={"/"}>
            <Image
              src={"/assets/icons/logo.svg"}
              alt="logo"
              width={40}
              height={40}
            />
            <h1>SnapCast</h1>
          </Link>
          <p>
            Create and Share your very first <span>SnapCast</span> in no time!
          </p>
          <button onClick={handleSignIn}>
            <Image
              src={"/assets/icons/google.svg"}
              alt="google"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay"></div>
    </main>
  );
};

export default Page;
