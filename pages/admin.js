import React, { useState, useEffect, use } from "react";
import { columns } from "../utils/bingoData";
import Tabuleiro from "../components/Tabuleiro";

export default function AdminBoard() {
  const [state, setState] = useState(columns);
  const [letra, setLetra] = useState(null);

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

    setLetra(null);
  }

  function resetarJogo() {
    const confirmado = window.confirm(
      "Tem certeza que deseja zerar o tabuleiro?",
    );

    if (confirmado) {
      setState(columns);
      localStorage.setItem("bingo:columns", JSON.stringify(columns));
      setLetra(null);
    }
  }

  const freeNumbers = Array.from({ length: 75 }, (_, index) => index + 1);
  return (
    <>
      <style>
        {`
        .bingo-btn {
          width: 100px;
          height: 82px;
          }
        .layout-principal {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            padding: 1.5rem;
            height: 100vh;
            width: 100vw;
            box-sizing: border-box;
          }
        .coluna-admin {
            width: 30%;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        .coluna-tabuleiro {
            width: 70%;
            overflow-y: auto;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            background: white;
            }
          
          `}
      </style>

      <div className="layout-principal">
        <div className="coluna-admin">
          <div className="flex justify-between items-center">
            <button onClick={resetarJogo}>Resetar</button>
          </div>
          {!letra ? (
            <div className="grid grid-cols-5 gap-3 bg-blue-400 p-6 rounded">
              {state.map((coluna) => (
                <button
                  key={coluna.label}
                  onClick={() => setLetra(coluna.label)}
                  className="bingo-btn"
                >
                  {coluna.label}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button onClick={() => setLetra(null)} className="bingo-btn">
                Voltar para as letras
              </button>

              <div className="grid grid-cols-5 gap-2 bg-blue-400 p-4 rounded">
                {(() => {
                  const coluna = state.find((c) => c.label === letra);

                  const numCol = Array.from(
                    { length: coluna.max - coluna.min + 1 },
                    (_, i) => coluna.min + i,
                  );

                  return numCol.map((num) => {
                    const sorteado = coluna.numbers.includes(num);
                    return (
                      <button
                        key={num}
                        disabled={sorteado}
                        onClick={() => addNumber(num)}
                        className="bingo-btn"
                      >
                        {num}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          )}
        </div>
        <div className="coluna-tabuleiro">
          <Tabuleiro dados={state} />
        </div>
      </div>
    </>
  );
}
