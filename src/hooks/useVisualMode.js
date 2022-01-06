import { useState } from "react";

export default function useVisualMode(init) {
  const [history, setHistory] = useState([init]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };
  const back = () => {
    if (history.length < 1) {
      return;
    }
    setHistory((prev) => {
      const newHist = [...prev];
      newHist.pop();
      return newHist;
    });
  };

  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}
