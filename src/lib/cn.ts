export default function cn(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(" ");
}