import { useState, useCallback } from "react";
import LatexInput from "./components/LatexInput";
import Title from "./components/Title";
import Equation from "./components/Equation";
import ButtonGroups from "./components/ButtonGroups";

function App() {
  const [value, setValue] = useState("");
  const [fontSize, setFontSize] = useState(20);

  const append = useCallback((x: string) => {
    setValue((prevValue) => prevValue + x);
  }, []);

  return (
    <main className="flex justify-center">
      <div className="max-w-[1024px] w-full px-4 flex flex-col items-center">
        <Title />
        <div className="mt-12 w-full">
          <ButtonGroups
            fontSize={fontSize}
            setFontSize={setFontSize}
            append={append}
          />
        </div>
        <LatexInput value={value} setValue={setValue} />
        <Equation fontSize={fontSize}>{value}</Equation>
      </div>
    </main>
  );
}

export default App;
