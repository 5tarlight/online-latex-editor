import { useState } from "react";
import cn from "../../lib/cn";
import MatrixMasterModal from "./MatrixMasterModal";

export default function OpenMatrix({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [matrix, setMatrix] = useState<string[][]>([[""]]);

  return (
    <>
      <button
        className={cn("border border-gray-400 px-4 py-2 rounded-md", "mt-8")}
        onClick={() => setOpen(true)}
      >
        Open Matrix Editor
      </button>
      {open && (
        <MatrixMasterModal
          cols={cols}
          matrix={matrix}
          rows={rows}
          setCols={setCols}
          setMatrix={setMatrix}
          setRows={setRows}
          setOpen={setOpen}
          setValue={setValue}
        />
      )}
    </>
  );
}
