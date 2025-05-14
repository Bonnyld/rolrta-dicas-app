
import React, { useState } from "react";

const App = () => {
  const [historico, setHistorico] = useState("");
  const [dicas, setDicas] = useState([]);

  const colarHistorico = async () => {
    try {
      const texto = await navigator.clipboard.readText();
      setHistorico(texto);
    } catch (err) {
      alert("Erro ao acessar a área de transferência.");
    }
  };

  const analisar = () => {
    const numeros = historico
      .split(/[^0-9]/)
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n >= 0 && n <= 36);

    const freq = {};
    numeros.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
    });

    const maisFrequentes = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([n]) => parseInt(n));

    const ausentes = Array.from({ length: 37 }, (_, i) => i).filter(n => !numeros.includes(n)).slice(0, 5);

    setDicas([...maisFrequentes, ...ausentes]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dicas de Roleta</h1>
      <button onClick={colarHistorico} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Colar Histórico
      </button>
      <textarea
        className="w-full h-32 p-2 border rounded mb-4"
        value={historico}
        onChange={(e) => setHistorico(e.target.value)}
        placeholder="Cole aqui os últimos números da roleta"
      />
      <button onClick={analisar} className="bg-green-600 text-white px-4 py-2 rounded">
        Analisar
      </button>

      {dicas.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Dicas sugeridas:</h2>
          <div className="flex flex-wrap gap-2">
            {dicas.map((n, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded text-lg">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
