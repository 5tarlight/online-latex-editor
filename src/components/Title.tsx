import { MathJax } from "better-react-mathjax";

export default function Title() {
  return (
    <h1 className="mt-16 font-extrabold select-none text-3xl flex gap-4">
      <MathJax>{"\\( \\LaTeX \\)"}</MathJax> Equation Editor
    </h1>
  );
}
