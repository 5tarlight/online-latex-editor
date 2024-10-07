import { MathJax } from "better-react-mathjax";
import React from "react";
import cn from "../lib/cn";
import "./Button.css";

const Button = React.memo(function Button({
  append,
  content,
}: {
  append(value: string): void;
  content: [string, string][];
}) {
  return (
    <div
      className={cn(
        "border border-gray-300 rounded-md relative bg-white inline-flex",
        "p-1 mx-1 py-0.5 eq-btn w-fit"
      )}
    >
      {content.slice(0, Math.min(6, content.length)).map((button) => (
        <button
          key={button[0]}
          className="px-1 py-1"
          onClick={() => append(button[1])}
        >
          <MathJax>{`\\(${button[0]}\\)`}</MathJax>
        </button>
      ))}
      {Array.from({ length: Math.ceil(content.length / 6) - 1 }, (_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full h-full hidden btn-inner z-10 p-1"
          style={{
            top: `${(i + 1) * 100}%`,
          }}
        >
          {content.slice(6 + i * 6, 12 + i * 6).map((button, j) => (
            <button
              key={button[0] + j}
              className="px-1 py-1"
              onClick={() => append(button[1])}
            >
              <MathJax>{`\\(${button[0]}\\)`}</MathJax>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
});

export default Button;
