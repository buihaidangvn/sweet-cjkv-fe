export function splitMora(text: string | null | undefined): string[] {
  return text?.match(/(?:[ぁ-ゖァ-ヺ][ゃゅょぁぃぅぇぉゎ]|.)/gu) ?? [];
}