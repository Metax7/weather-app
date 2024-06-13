import { nav } from "@/data/nav";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <ul className="flex items-center justify-center py-5">
        {nav.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
