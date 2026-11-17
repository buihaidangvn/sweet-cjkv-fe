import { Suspense } from "react";
import { SearchPage } from "./component/SearchPage";

/**
 * TODO fix this: The rendering logic is doing too much.
 * form management
URL state management
API calls
result formatting
accent rendering
dictionary-like display logic
inline map/set dedupe
 */
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
