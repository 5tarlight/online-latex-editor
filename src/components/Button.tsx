import { MathJax } from "better-react-mathjax";

export default function Button({
  value,
  setValue,
  content,
}: {
  value: string;
  setValue: (value: string) => void;
  content: string[];
}) {
  return (
    <div className="flex border border-gray-300 rounded-md">
      {content.map((button) => (
        <button
          key={button}
          className="px-1 py-1"
          onClick={() => setValue(value + button)}
        >
          <MathJax>{`\\(${button}\\)`}</MathJax>
        </button>
      ))}
    </div>
  );
}
