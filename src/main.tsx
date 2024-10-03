import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MathJaxContext config={mathJaxConfig}>
      <App />
    </MathJaxContext>
  </StrictMode>
);
