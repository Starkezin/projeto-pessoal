import React, { useState, useEffect } from "react";
import { columns } from "../utils/bingoData";
import Tabuleiro from "../components/Tabuleiro";

export default function AdminBoard() {
  const [state, setState] = useState(columns);
  useEffect(() => {
    const jogoSalvo = localStorage.getItem("bingo:columns");
    if (jogoSalvo != null) {
      setState(JSON.parse(jogoSalvo));
    }
  }, []);

  function addNumber(number) {
    const newState = state.map((column) => {
      if (number >= column.min && number <= column.max) {
        if (column.numbers.includes(number)) {
          return column;
        }

        return {
          ...column,
          numbers: [...column.numbers, number],
        };
      }
      return column;
    });
    setState(newState);
    localStorage.setItem("bingo:columns", JSON.stringify(newState));
  }

  function resetarJogo() {
    setState(columns);
    localStorage.setItem("bingo:columns", JSON.stringify(columns));
  }

  const freeNumbers = Array.from({ length: 75 }, (_, index) => index + 1);
  return (
    <div className="flex flex-row gap-8 p-6">
      <div className="w-1/2">
        <div className="grid grid-cols-5 gap-2 bg-blue-400 pt-6 rounded">
          {freeNumbers.map((num) => {
            const sorteado = state.some((coluna) =>
              coluna.numbers.includes(num),
            );
            return (
              <button
                key={num}
                disabled={sorteado}
                onClick={() => addNumber(num)}
                className={
                  sorteado
                    ? "bg-gray-400 text-gray-600 font-bold rounded w-full h-20 text-2xl block" // <-- Adicionado "block" aqui
                    : "bg-blue-500 text-white font-bold rounded w-full h-20 text-2xl block hover:bg-blue-600" // <-- E "block" aqui também
                }
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-1/2">
        <Tabuleiro dados={state} />
      </div>

      <button onClick={resetarJogo}>Resetar</button>
    </div>
  );
}
