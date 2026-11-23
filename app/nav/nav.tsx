import Link from "next/link";

export default function Nav() {
  return (
    <div className="w-full">
      <Link href="/" className="border rounded px-3 py-1 font-bold">
        SWLH
      </Link>
    </div>
  );
}
