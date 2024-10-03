import { MathJax, MathJaxContext } from "better-react-mathjax";
import ExportToSvg from "./Downloads/ExportToSvg";
import ExportToPng from "./Downloads/ExportToPng";

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
      >
        {`\\( ${children} \\)`}
      </MathJax>
      <div className="flex justify-center flex-col-2 gap-2">
        <ExportToSvg children={children} />
        <ExportToPng children={children} />
      </div>
    </div>
  );
}
