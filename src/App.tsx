import { useState, useCallback, useRef } from "react";
import LatexInput from "./components/LatexInput";
import Title from "./components/Title";
import Equation from "./components/Equation";
import ButtonGroups from "./components/ButtonGroups";
import OpenMatrix from "./components/matrix/OpenMatrix";

function App() {
  const [value, setValue] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingCursorRef = useRef<{ start: number; end: number } | null>(null);

  const insertAtCursor = useCallback((text: string) => {
    const ta = textareaRef.current;
    const start = ta?.selectionStart ?? 0;
    const end = ta?.selectionEnd ?? 0;

    setValue((prev) => prev.slice(0, start) + text + prev.slice(end));

    const firstBrace = text.indexOf("{}");
    const cursorPos =
      firstBrace !== -1 ? start + firstBrace + 1 : start + text.length;
    pendingCursorRef.current = { start: cursorPos, end: cursorPos };
  }, []);

  return (
    <main className="flex justify-center">
      <div className="max-w-[1024px] w-full px-4 flex flex-col items-center mb-8">
        <Title />
        <div className="mt-12 w-full">
          <ButtonGroups
            fontSize={fontSize}
            setFontSize={setFontSize}
            append={insertAtCursor}
          />
        </div>
        <OpenMatrix insertAtCursor={insertAtCursor} />
        <LatexInput
          value={value}
          setValue={setValue}
          textareaRef={textareaRef}
          pendingCursorRef={pendingCursorRef}
        />
        <Equation fontSize={fontSize}>{value}</Equation>
      </div>
    </main>
  );
}

export default App;
