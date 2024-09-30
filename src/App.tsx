import { useState } from "react";
import LatexInput from "./components/LatexInput";
import Title from "./components/Title";

function App() {
  const [value, setValue] = useState("");

  return (
    <main className="flex justify-center">
      <div className="max-w-[1024px] w-full flex flex-col items-center">
        <Title />
        <div className="mt-12">Buttons...</div>
        <LatexInput value={value} setValue={setValue} />
        <div className="mt-16">{value}</div>
      </div>
    </main>
  );
}

export default App;
