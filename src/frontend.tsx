import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Reports } from "./components/Reports/Reports";

const elem = document.getElementById("root");

if (elem) {
  createRoot(elem).render(
    <StrictMode>
      <Reports />
    </StrictMode>
  );
}
