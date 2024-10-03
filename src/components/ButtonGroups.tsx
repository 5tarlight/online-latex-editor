import { buttons } from "../lib/button-content";
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
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 flex-wrap w-full">
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
      <div className="flex-wrap mt-8 relative w-full">
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
