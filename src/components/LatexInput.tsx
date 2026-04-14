import { useEffect, useRef, useState } from "react";

const BRACKET_PAIRS: Record<string, string> = {
  "{": "}",
  "(": ")",
  "[": "]",
};
const CLOSE_BRACKETS = new Set(["}", ")", "]"]);
const OPEN_BRACKETS_STR = "{([";
const CLOSE_BRACKETS_STR = "})]";

function findMatchingBracket(
  text: string,
  pos: number
): [number, number] | null {
  let checkPos = -1;

  if (
    pos > 0 &&
    (OPEN_BRACKETS_STR.includes(text[pos - 1]) ||
      CLOSE_BRACKETS_STR.includes(text[pos - 1]))
  ) {
    checkPos = pos - 1;
  } else if (
    pos < text.length &&
    (OPEN_BRACKETS_STR.includes(text[pos]) ||
      CLOSE_BRACKETS_STR.includes(text[pos]))
  ) {
    checkPos = pos;
  }

  if (checkPos === -1) return null;

  const ch = text[checkPos];
  const openIdx = OPEN_BRACKETS_STR.indexOf(ch);
  const closeIdx = CLOSE_BRACKETS_STR.indexOf(ch);

  if (openIdx !== -1) {
    const target = CLOSE_BRACKETS_STR[openIdx];
    let depth = 1;
    for (let i = checkPos + 1; i < text.length; i++) {
      if (text[i] === ch) depth++;
      if (text[i] === target) depth--;
      if (depth === 0) return [checkPos, i];
    }
  } else if (closeIdx !== -1) {
    const target = OPEN_BRACKETS_STR[closeIdx];
    let depth = 1;
    for (let i = checkPos - 1; i >= 0; i--) {
      if (text[i] === ch) depth++;
      if (text[i] === target) depth--;
      if (depth === 0) return [i, checkPos];
    }
  }

  return null;
}

function renderHighlightedText(
  text: string,
  highlights: [number, number] | null
) {
  if (!highlights || text.length === 0) {
    return <span className="text-transparent">{text || " "}</span>;
  }

  const [a, b] = highlights;
  const positions = [Math.min(a, b), Math.max(a, b)];
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;

  for (const pos of positions) {
    if (pos > lastIdx) {
      parts.push(
        <span key={`t${lastIdx}`} className="text-transparent">
          {text.slice(lastIdx, pos)}
        </span>
      );
    }
    parts.push(
      <span
        key={`h${pos}`}
        className="text-transparent"
        style={{ backgroundColor: "rgba(255, 210, 0, 0.4)", borderRadius: 2 }}
      >
        {text[pos]}
      </span>
    );
    lastIdx = pos + 1;
  }

  if (lastIdx < text.length) {
    parts.push(
      <span key={`t${lastIdx}`} className="text-transparent">
        {text.slice(lastIdx)}
      </span>
    );
  }

  return <>{parts}</>;
}

const FONT_STYLE = {
  fontFamily:
    "'Jetbrains Mono', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', monospace",
};

export default function LatexInput({
  value,
  setValue,
  textareaRef,
  pendingCursorRef,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  pendingCursorRef: React.MutableRefObject<{
    start: number;
    end: number;
  } | null>;
}) {
  const highlightRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState(0);

  const matchingBrackets = findMatchingBracket(value, cursorPos);

  useEffect(() => {
    const pos = pendingCursorRef.current;
    if (pos && textareaRef.current) {
      textareaRef.current.setSelectionRange(pos.start, pos.end);
      textareaRef.current.focus();
      pendingCursorRef.current = null;
      setCursorPos(pos.start);
    }
  }, [value, pendingCursorRef, textareaRef]);

  const handleSelect = () => {
    if (textareaRef.current) {
      setCursorPos(textareaRef.current.selectionStart);
    }
  };

  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = ta;

    // Auto-close brackets
    if (e.key in BRACKET_PAIRS && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const close = BRACKET_PAIRS[e.key];
      const selected = value.slice(start, end);
      const insertion = e.key + selected + close;
      setValue(value.slice(0, start) + insertion + value.slice(end));
      pendingCursorRef.current = {
        start: start + 1,
        end: start + 1 + selected.length,
      };
      return;
    }

    // Skip over closing brackets
    if (CLOSE_BRACKETS.has(e.key) && start === end && !e.ctrlKey && !e.metaKey) {
      if (value[start] === e.key) {
        e.preventDefault();
        ta.setSelectionRange(start + 1, start + 1);
        setCursorPos(start + 1);
        return;
      }
    }

    // Backspace removes empty bracket pairs
    if (e.key === "Backspace" && start === end && start > 0) {
      const charBefore = value[start - 1];
      const charAfter = value[start];
      if (
        charBefore in BRACKET_PAIRS &&
        BRACKET_PAIRS[charBefore] === charAfter
      ) {
        e.preventDefault();
        setValue(value.slice(0, start - 1) + value.slice(start + 1));
        pendingCursorRef.current = { start: start - 1, end: start - 1 };
        return;
      }
    }

    // Tab to jump to next empty bracket pair
    if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const searchFrom = start;
      let nextPos = -1;

      for (let i = searchFrom; i < value.length - 1; i++) {
        const ch = value[i];
        const next = value[i + 1];
        if (ch in BRACKET_PAIRS && BRACKET_PAIRS[ch] === next) {
          nextPos = i + 1;
          break;
        }
      }

      if (nextPos !== -1) {
        ta.setSelectionRange(nextPos, nextPos);
        setCursorPos(nextPos);
      } else {
        setValue(value.slice(0, start) + "  " + value.slice(end));
        pendingCursorRef.current = { start: start + 2, end: start + 2 };
      }
      return;
    }
  };

  return (
    <div className="relative mt-8 w-full">
      <div
        ref={highlightRef}
        className="absolute top-0 left-0 w-full h-64 p-2 border-2 border-transparent rounded-md overflow-hidden pointer-events-none select-none"
        style={{
          ...FONT_STYLE,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        }}
        aria-hidden="true"
      >
        {renderHighlightedText(value, matchingBrackets)}
      </div>
      <textarea
        ref={textareaRef}
        spellCheck="false"
        className="w-full h-64 p-2 border-2 border-gray-300 rounded-md resize-none text-lg bg-transparent relative"
        style={{
          ...FONT_STYLE,
          caretColor: "black",
        }}
        value={value}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        onScroll={handleScroll}
        onChange={(e) => {
          pendingCursorRef.current = null;
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
