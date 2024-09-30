export default function LatexInput({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <textarea
      className={
        "w-full h-64 p-2 mt-12 border-2 border-gray-300 rounded-md " +
        "resize-none"
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></textarea>
  );
}
