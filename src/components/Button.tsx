import { MathJax } from "better-react-mathjax";
import { useState } from "react";

export default function Button({
  value,
  setValue,
  content,
}: {
  value: string;
  setValue: (value: string) => void;
  content: [string, string][];
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={
        "border border-gray-300 rounded-md relative bg-white inline-flex p-1 m-1" +
        (hover ? " shadow-md flex-col z-10" : "")
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <>
          {Array.from({ length: Math.ceil(content.length / 6) }, (_, i) => (
            <div key={i} className="flex">
              {content
                .slice(i * 6, Math.min((i + 1) * 6, content.length))
                .map((button) => (
                  <button
                    key={button[0]}
                    className="px-1 py-1"
                    onClick={() => setValue(value + button[1])}
                  >
                    <MathJax>{`\\(${button[0]}\\)`}</MathJax>
                  </button>
                ))}
            </div>
          ))}
        </>
      ) : (
        <>
          {content.slice(0, Math.min(6, content.length)).map((button) => (
            <button
              key={button[0]}
              className="px-1 py-1"
              onClick={() => setValue(value + button[1])}
            >
              <MathJax>{`\\(${button[0]}\\)`}</MathJax>
            </button>
          ))}
        </>
      )}
    </div>
  );
}
