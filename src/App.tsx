import { useState } from "react";
import LatexInput from "./components/LatexInput";
import Title from "./components/Title";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function App() {
  const [value, setValue] = useState("");
  const [fontSize, setFontSize] = useState(20);

  return (
    <main className="flex justify-center">
      <div className="max-w-[1024px] w-full flex flex-col items-center">
        <Title />
        <div className="mt-12">Buttons...</div>
        <LatexInput value={value} setValue={setValue} />
        <div className="mt-16">
          <MathJaxContext>
            <MathJax
              style={{
                fontSize: `${fontSize}px`,
                color: "black",
                backgroundColor: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
            >{`\\(\\displaystyle ${value}\\)`}</MathJax>
          </MathJaxContext>
        </div>
      </div>
    </main>
  );
}

export default App;
