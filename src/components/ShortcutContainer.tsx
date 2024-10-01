export default function ShortcutContainer({
  value,
  setValue,
  fontSize,
  setFontSize,
}: {
  value: string;
  setValue: (value: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          Font Size :
          <input
            type="number"
            className={
              "w-16 pl-2 outline-none border border-gray-300 rounded-md " +
              "text-center"
            }
            value={fontSize}
            onChange={(e) => setFontSize(e.target.valueAsNumber)}
          />{" "}
          px
        </div>
      </div>
    </div>
  );
}
