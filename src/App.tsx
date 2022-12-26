import { useState } from "react";
import { GlobalStyles } from "./styles";
import AnimatedRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <GlobalStyles />
      <AnimatedRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
