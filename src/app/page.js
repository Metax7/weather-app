import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link
        href={"/weather"}
        className="block rounded-xl bg-black px-10 py-5 text-xl text-white md:text-5xl"
      >
        WATCH WEATHER
      </Link>
    </div>
  );
}
