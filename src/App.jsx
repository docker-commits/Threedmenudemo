import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ThreeDMenu1 from "./Threedmenu1";
import ThreeDMenu from "./ThreeDmenu";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ThreeDMenu1 />
    </div>
  );
}

export default App;
