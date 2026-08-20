import { useEffect } from "react";

export default function Tabuleiro({ dados }) {
  return (
    <>
      <style>{` 
        .bingo {
          display: grid;
          grid-template-columns: repeat(5, minmax(0,1fr));
          gap: 1rem;
          background-color: lightgray;
          text-align: center;
          font-size: 40px;
          font-weight: 800;
          
        }
        .bingo div {
          border: 1px solid black;
          padding: 10px;
          border-radius: 0.5rem;
        }

        .results {
          display:grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 1rem;
          background-color: #F8F0E0;
          text-align: center;
          font-size: 50px;
          font-weight: 800;
          grid-auto-rows: 990px;
        }
        .results div {
          padding: 10px;
        }
        .results-coluna {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-content: start;
          border: 1px solid black;
          border-radius: 0.5rem;
        }

        .results-numeros {
          padding: 10px;
          background-color: bg-blue-200;
        }

      `}</style>
      <div className="bingo">
        {dados.map(({ label }) => (
          <div key={label} className="bg-blue-200 pt-6 rounded">
            {label}
          </div>
        ))}
      </div>

      <div className="results">
        {dados.map(({ label, numbers }) => (
          <div key={label} className="results-coluna">
            {numbers.map((num) => (
              <div key={num} className="results-numeros">
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
