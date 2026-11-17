export function trimChar(str: string | null | undefined, char: string): string {
  if (!str) return "";
  return str.replace(new RegExp(`^[${char}]+|[${char}]+$`, "g"), "");
}
