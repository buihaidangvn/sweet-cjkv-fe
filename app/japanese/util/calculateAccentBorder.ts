export function calculateAccentBorder(
  mora: string | undefined,
  moraIndex: number,
  accent: string | undefined,
): string {
  if (!mora || moraIndex < 0 || !accent) return "";
  const correspongingAccent = accent?.at(moraIndex);
  if (!correspongingAccent) return "";
  const nextAccent = accent?.at(moraIndex + 1);
  if (!nextAccent) return "";

  let classArr: string[] = [];
  switch (correspongingAccent) {
    case "H":
      classArr.push("border-t");
      break;
    case "L":
      classArr.push("border-b");
      break;
    default:
      return "";
  }
  if (nextAccent === "-") {
    const finalAccent = accent.at(moraIndex + 2);
    if (finalAccent) {
      const isLowToHigh = correspongingAccent === "L" && finalAccent === "H";
      const isHighToLow = correspongingAccent === "H" && finalAccent === "L";
      if (isHighToLow || isLowToHigh) {
        classArr.push("border-r");
      }
    }
  } else {
    const isLowToHigh = correspongingAccent === "L" && nextAccent === "H";
    const isHighToLow = correspongingAccent === "H" && nextAccent === "L";
    if (isHighToLow || isLowToHigh) {
      classArr.push("border-r");
    }
  }
  return classArr.join(" ");
}
