import { useState } from "react";
import { GlobalStyles } from "./styles";
import AnimatedRouter from "./routes";

function App() {
  return (
    <div>
      <GlobalStyles />
      <AnimatedRouter />
    </div>
  );
}

export default App;
