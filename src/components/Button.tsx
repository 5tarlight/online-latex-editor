import { MathJax } from "better-react-mathjax";
import { useState } from "react";
import React from "react";

const Button = React.memo(function Button({
  append,
  content,
}: {
  append(value: string): void;
  content: [string, string][];
}) {
  const [hover, setHover] = useState(false);
  console.log("Button render");

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
            <div key={i} className="flex w-full justify-between">
              {content
                .slice(i * 6, Math.min((i + 1) * 6, content.length))
                .map((button) => (
                  <button
                    key={button[0]}
                    className="px-1 py-1 flex justify-center items-center w-full"
                    onClick={() => append(button[1])}
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
              onClick={() => append(button[1])}
            >
              <MathJax>{`\\(${button[0]}\\)`}</MathJax>
            </button>
          ))}
        </>
      )}
    </div>
  );
});

export default Button;
