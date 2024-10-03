import Button from "./Button";

export default function ButtonGroups({
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
  const buttons: string[][][] = [
    [
      [
        "\\frac{a}{b}",
        "\\sqrt{a}",
        "\\sqrt[n]{a}",
        "\\sum",
        "\\int",
        "\\infty",
      ],
    ],
  ];

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
      <div className="flex gap-4 flex-wrap mt-8">
        {buttons.map((content, index) => (
          <Button
            key={index}
            content={content}
            value={value}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
}
