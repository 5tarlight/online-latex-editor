import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function Equation({
  children,
  fontSize,
}: {
  children: string;
  fontSize: number;
}) {
  return (
    <div className="mt-16">
      <MathJaxContext
        config={{
          tex: {
            processEscapes: true,
            linebreaks: { automatic: true },
          },
        }}
      >
        <MathJax
          style={{
            fontSize: `${fontSize}px`,
            color: "black",
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >{`\\[ ${children} \\]`}</MathJax>
      </MathJaxContext>
    </div>
  );
}
