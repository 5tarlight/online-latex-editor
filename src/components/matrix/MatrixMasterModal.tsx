import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { MathJax } from "better-react-mathjax";
import cn from "../../lib/cn";

type Brackets = "(x)" | "[x]" | "{x}" | "|x|" | "||x||" | "none";

const BRACKETS_MAP: Record<Brackets, string> = {
  none: "matrix",
  "[x]": "bmatrix",
  "(x)": "pmatrix",
  "{x}": "Bmatrix",
  "|x|": "vmatrix",
  "||x||": "Vmatrix",
};

const BRACKET_OPTIONS: { value: Brackets; label: string }[] = [
  { value: "[x]", label: "[x]" },
  { value: "(x)", label: "(x)" },
  { value: "{x}", label: "{x}" },
  { value: "|x|", label: "|x|" },
  { value: "||x||", label: "||x||" },
  { value: "none", label: "None" },
];

export default function MatrixMasterModal({
  setOpen,
  rows,
  setRows,
  cols,
  setCols,
  matrix,
  setMatrix,
  insertAtCursor,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  cols: number;
  setCols: React.Dispatch<React.SetStateAction<number>>;
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
  insertAtCursor: (text: string) => void;
}) {
  const [brackets, setBrackets] = useState<Brackets>("[x]");
  const cellRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const pendingFocus = useRef<[number, number] | null>(null);

  const getCellKey = (i: number, j: number) => `${i}-${j}`;

  const focusCell = useCallback((i: number, j: number) => {
    const key = getCellKey(i, j);
    const el = cellRefs.current.get(key);
    if (el) {
      el.focus();
      el.select();
    } else {
      pendingFocus.current = [i, j];
    }
  }, []);

  useEffect(() => {
    if (pendingFocus.current) {
      const [i, j] = pendingFocus.current;
      pendingFocus.current = null;
      const el = cellRefs.current.get(getCellKey(i, j));
      if (el) {
        el.focus();
        el.select();
      }
    }
  });

  const buildLatex = useCallback(() => {
    const env = BRACKETS_MAP[brackets];
    return `\\begin{${env}}\n${matrix
      .map((row) => row.map((it) => it || "0").join(" & "))
      .join(" \\\\ ")}\n\\end{${env}}`;
  }, [brackets, matrix]);

  const previewLatex = useMemo(() => buildLatex(), [buildLatex]);

  const handleApply = () => {
    insertAtCursor(buildLatex());
    handleClose();
  };

  const handleCellKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    switch (e.key) {
      case "ArrowRight":
        if (j < cols - 1) { e.preventDefault(); focusCell(i, j + 1); }
        break;
      case "ArrowLeft":
        if (j > 0) { e.preventDefault(); focusCell(i, j - 1); }
        break;
      case "ArrowDown":
        if (i < rows - 1) { e.preventDefault(); focusCell(i + 1, j); }
        break;
      case "ArrowUp":
        if (i > 0) { e.preventDefault(); focusCell(i - 1, j); }
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          if (j > 0) focusCell(i, j - 1);
          else if (i > 0) focusCell(i - 1, cols - 1);
        } else {
          if (j < cols - 1) focusCell(i, j + 1);
          else if (i < rows - 1) focusCell(i + 1, 0);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (i < rows - 1) focusCell(i + 1, j);
        else handleApply();
        break;
    }
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black z-10 flex justify-center items-center p-4",
        "transition-opacity duration-200",
        visible ? "bg-opacity-40" : "bg-opacity-0"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "bg-white rounded-md flex flex-col",
          "w-full max-w-2xl max-h-[90vh] overflow-hidden",
          "transition-all duration-200",
          visible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b border-gray-100">
          <span className="font-medium text-gray-700">Matrix Editor</span>
          <button
            className="text-gray-400 hover:text-gray-600 text-lg px-2"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Bracket type */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 flex-wrap justify-center">
              {BRACKET_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  className={cn(
                    "border rounded-sm px-4 py-1",
                    brackets === value ? "bg-gray-200" : "hover:bg-gray-100"
                  )}
                  onClick={() => setBrackets(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Size controls */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2 items-center">
              <label className="text-sm text-gray-500">Rows</label>
              <input
                type="number"
                className="w-16 border rounded-sm p-1 text-center"
                value={rows}
                min={1}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  if (v < 1) return;
                  const newMatrix = Array.from({ length: v }, (_, i) =>
                    Array.from({ length: cols }, (_, j) => matrix[i]?.[j] ?? "")
                  );
                  setRows(v);
                  setMatrix(newMatrix);
                }}
              />
              <span className="text-gray-400">x</span>
              <label className="text-sm text-gray-500">Cols</label>
              <input
                type="number"
                className="w-16 border rounded-sm p-1 text-center"
                value={cols}
                min={1}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  if (v < 1) return;
                  const newMatrix = Array.from({ length: rows }, (_, i) =>
                    Array.from({ length: v }, (_, j) => matrix[i]?.[j] ?? "")
                  );
                  setCols(v);
                  setMatrix(newMatrix);
                }}
              />
            </div>
          </div>

          {/* Cell grid */}
          <div className="overflow-x-auto pb-2">
            <div className="flex flex-col gap-1 items-center min-w-fit">
              {matrix.map((row, i) => (
                <div key={i} className="flex gap-1">
                  {row.map((_col, j) => (
                    <input
                      key={getCellKey(i, j)}
                      ref={(el) => {
                        if (el) cellRefs.current.set(getCellKey(i, j), el);
                        else cellRefs.current.delete(getCellKey(i, j));
                      }}
                      type="text"
                      className={cn(
                        "w-16 h-8 text-center text-sm border rounded-sm",
                        "border-gray-400 outline-none",
                        "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                        "transition-colors duration-150"
                      )}
                      style={{
                        fontFamily:
                          "'Jetbrains Mono', 'Ubuntu Mono', 'Consolas', monospace",
                      }}
                      value={matrix[i][j]}
                      placeholder="0"
                      onChange={(e) => {
                        const val = e.target.value;
                        setMatrix((prev) =>
                          prev.map((r, ii) =>
                            r.map((c, jj) => (ii === i && jj === j ? val : c))
                          )
                        );
                      }}
  
                      onKeyDown={(e) => handleCellKeyDown(e, i, j)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mt-6 border border-gray-200 rounded-md p-4 bg-gray-50">
            <div className="text-xs text-gray-400 mb-2">Preview</div>
            <div className="overflow-x-auto flex justify-center">
              <MathJax dynamic={true}>{`\\[${previewLatex}\\]`}</MathJax>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            className={cn("bg-red-400 px-6 py-1.5 text-white", "rounded-sm hover:bg-red-500")}
            onClick={() => {
              if (!confirm("Are you sure you want to reset?")) return;
              setRows(1);
              setCols(1);
              setMatrix([[""]]);
            }}
          >
            Reset
          </button>
          <button
            className={cn("bg-green-500 px-6 py-1.5 text-white", "rounded-sm hover:bg-green-600")}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
