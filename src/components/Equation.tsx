import { MathJax } from "better-react-mathjax";

export default function Equation({
  children,
  fontSize,
}: {
  children: string;
  fontSize: number;
}) {
  return (
    <div className="mt-8">
      <MathJax
        style={{
          fontSize: `${fontSize}px`,
          color: "black",
          backgroundColor: "white",
          padding: "0.5rem",
          borderRadius: "0.5rem",
        }}
      >{`\\[ ${children} \\]`}</MathJax>
    </div>
  );
}
