export default function LatexInput({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <textarea
      spellCheck="false"
      className={
        "w-full h-64 p-2 mt-12 border-2 border-gray-300 rounded-md " +
        "resize-none text-lg"
      }
      style={{
        fontFamily:
          "'Jetbrains Mono', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', monospace",
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></textarea>
  );
}
