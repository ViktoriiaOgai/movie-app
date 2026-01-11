
export function truncate(text: string, max = 100) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "...";
}
