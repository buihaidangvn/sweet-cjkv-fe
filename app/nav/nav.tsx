import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Nav() {
  return (
    <div className="w-full flex gap-2">
      <Link href="/" className="border rounded px-3 py-1 font-bold">
        SWLH
      </Link>
      <ThemeToggle />
    </div>
  );
}
