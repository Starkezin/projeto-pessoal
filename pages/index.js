import React, { useState, useEffect } from "react";
import Tabuleiro from "../components/Tabuleiro";
import { columns } from "../utils/bingoData";

export default function BingoBoard() {
  const [state, setState] = useState(columns);

  useEffect(() => {
    const newList = localStorage.getItem("bingo:columns");
    let newState = null;
    if (newList != null) {
      newState = JSON.parse(newList);
      setState(newState);
    }

    function handler(event) {
      if (event.key === "bingo:columns") {
        const newValue = event.newValue;
        if (newValue != null) {
          newState = JSON.parse(newValue);
          setState(newState);
        }
      }
    }
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  return <Tabuleiro dados={state} />;
}
