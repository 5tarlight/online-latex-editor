import cn from "../../lib/cn";

export default function MatrixMasterModal({
  setOpen,
  rows,
  setRows,
  cols,
  setCols,
  matrix,
  setMatrix,
  setValue,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  cols: number;
  setCols: React.Dispatch<React.SetStateAction<number>>;
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-screen h-screen bg-black",
        "bg-opacity-40 z-10 flex justify-center items-center"
      )}
    >
      <div
        className={cn(
          "bg-white p-6 rounded-md flex flex-col",
          "justify-between min-w-[512px] min-h-[240px]"
        )}
      >
        <div
          className="flex justify-end select-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(false);
          }}
        >
          X
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              className="w-16 border rounded-sm p-1"
              value={rows}
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
            <span>X</span>
            <input
              type="number"
              className="w-16 border rounded-sm p-1"
              value={cols}
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

          <div className="flex flex-col mt-8 gap-2">
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-2">
                {row.map((col, j) => (
                  <div
                    key={i * rows + j}
                    className={cn(
                      "w-6 h-6 transition-all duration-200 cursor-pointer",
                      matrix[i][j]
                        ? "bg-gray-200"
                        : "border border-gray-400 hover:bg-gray-100"
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          <button className="border rounded-sm px-4 py-1 border-gray-400">
            Apply
          </button>
          <button
            className={cn("bg-red-400 px-4 py-1 text-white", "rounded-sm")}
            onClick={() => {
              if (!confirm("Are you sure you want to reset?")) return;

              setRows(1);
              setCols(1);
              setMatrix([[""]]);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
