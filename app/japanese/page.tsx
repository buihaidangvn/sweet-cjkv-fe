import { Suspense } from "react";
import { SearchPage } from "./component/SearchPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
