import Link from "next/link";
import { Suspense } from "react";
import { SearchPage } from "./japanese/component/SearchPage";
import Nav from "./nav/nav";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 h-full w-full">
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPage />
      </Suspense>
    </div>
  );
}
