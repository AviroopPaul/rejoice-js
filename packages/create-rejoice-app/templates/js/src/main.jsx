import { createRoot, RejoiceProvider } from "rejoice-js";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <RejoiceProvider defaultTheme="{{defaultTheme}}">
    <App />
  </RejoiceProvider>
);
