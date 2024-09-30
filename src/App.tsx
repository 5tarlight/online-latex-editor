import { useState } from "react";
import LatexInput from "./components/LatexInput";
import Title from "./components/Title";
import Equation from "./components/Equation";

function App() {
  const [value, setValue] = useState("");
  const [fontSize, setFontSize] = useState(20);

  return (
    <main className="flex justify-center">
      <div className="max-w-[1024px] w-full flex flex-col items-center">
        <Title />
        <div className="mt-12">Buttons...</div>
        <LatexInput value={value} setValue={setValue} />
        <Equation fontSize={fontSize}>{value}</Equation>
      </div>
    </main>
  );
}

export default App;
