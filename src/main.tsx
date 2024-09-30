import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MathJaxContext } from "better-react-mathjax";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MathJaxContext
      config={{
        tex: {
          processEscapes: true,
          linebreaks: { automatic: true },
        },
      }}
    >
      <App />
    </MathJaxContext>
  </StrictMode>
);
