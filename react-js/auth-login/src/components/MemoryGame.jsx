/* Este componente implementa um jogo da memória usando estado local com useState.
O baralho é criado de forma imutável e baralhado.
Uso useMemo para garantir que o baralho inicial só é gerado uma vez.
A lógica controla cartas viradas, valida pares e mantém um contador de movimentos.
Quando todas as cartas estão marcadas como matched, o jogo termina. */

//-----------------------------------------------------------------------------------

import { useMemo, useState } from "react";

// Função auxiliar para baralhar um array
function shuffle(array) {
  const a = [...array]; // cria uma cópia do array original
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]; // troca de posições
  }
  return a;
}

export default function MemoryGame() {
  const symbols = ["🍎", "🚀", "🎧", "⚽", "🐶", "🌙", "🍕", "🎲"];

  // Função para criar o baralho inicial 
  const makeDeck = () => {
    const pairs = [...symbols, ...symbols].map((value, idx) => ({
      id: idx + "-" + value,
      value,
      matched: false,
    }));
    return shuffle(pairs); // devolve o baralho
  };

  const initialCards = useMemo(() => makeDeck(), []); // cria o baralho inicial uma única vez
  const [cards, setCards] = useState(initialCards); // estado do baralho
  const [flipped, setFlipped] = useState([]); // índices das cartas viradas
  const [moves, setMoves] = useState(0); // contador de movimentos

  const finished = cards.length > 0 && cards.every((c) => c.matched); // verifica se o jogo terminou

  // Função para reiniciar o jogo
  function resetGame() {
    setCards(makeDeck());
    setFlipped([]);
    setMoves(0);
  }

  // Função para lidar com a virada de uma carta
  function handleFlip(index) {
    if (finished) return; // não faz nada se o jogo terminou
    if (cards[index].matched) return; // não faz nada se a carta já foi combinada
    if (flipped.length === 2) return; // impede virar mais de duas cartas
    if (flipped.includes(index)) return; // impede virar a mesma carta

    const next = [...flipped, index]; // nova lista de cartas viradas
    setFlipped(next);

    // Se já existem duas cartas viradas, é uma tentativa 
    if (next.length === 2) {
      setMoves((m) => m + 1);

      const [a, b] = next;
      const c1 = cards[a];
      const c2 = cards[b];

      // Se os símbolos forem iguais, marca como matched
      if (c1.value === c2.value) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, matched: true } : c
            )
          );
          setFlipped([]);
        }, 250);
      } else {
        // Caso não sejam iguais, vira novamente para baixo
        setTimeout(() => setFlipped([]), 550);
      }
    }
  }

  return (
    <div>
      {/* Cabeçalho do jogo */}
      <div className="memory-header">
        <strong>Jogo da Memória</strong> - <span>Movimentos: {moves}</span>
        <button onClick={resetGame} type="button">
          Reiniciar
        </button>
      </div>

      {/* Grelha das cartas */}
      <div className="memory-grid">
        {cards.map((card, idx) => {
          // A carta fica visível se estiver matched ou virada
          const isUp = card.matched || flipped.includes(idx);
          return (
            <button
              key={card.id}
              className="memory-card"
              onClick={() => handleFlip(idx)}
              type="button"
              disabled={finished}
              style={{ opacity: finished ? 0.95 : 1 }}
            >
              {isUp ? card.value : "?"}
            </button>
          );
        })}
      </div>

      {/* Mensagem apresentada quando o jogo termina */}
      {finished && (
        <div className="memory-finish">
          <strong>🎉 Parabéns! Completaste o jogo.</strong>
          <button onClick={resetGame} type="button">
            Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
}
