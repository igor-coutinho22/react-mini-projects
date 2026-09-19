import { useMemo, useState } from "react";

const SYMBOLS = ["🍎", "🚀", "🎧", "⚽", "🐶", "🌙", "🍕", "🎲"];

// Fisher-Yates shuffle
function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck() {
  const pairs = [...SYMBOLS, ...SYMBOLS].map((value, idx) => ({
    id: idx + "-" + value,
    value,
    matched: false,
  }));
  return shuffle(pairs);
}

export default function MemoryGame() {
  // useMemo keeps the initial deck stable across re-renders; resetGame() builds a fresh one explicitly
  const initialCards = useMemo(() => makeDeck(), []);
  const [cards, setCards] = useState(initialCards);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);

  const finished = cards.length > 0 && cards.every((c) => c.matched);

  function resetGame() {
    setCards(makeDeck());
    setFlipped([]);
    setMoves(0);
  }

  function handleFlip(index) {
    if (finished) return;
    if (cards[index].matched) return;
    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);

      const [a, b] = next;
      const c1 = cards[a];
      const c2 = cards[b];

      if (c1.value === c2.value) {
        // brief delay so the player sees both cards before they lock in as matched
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, matched: true } : c
            )
          );
          setFlipped([]);
        }, 250);
      } else {
        // longer delay so the player can memorize the mismatched pair before it flips back
        setTimeout(() => setFlipped([]), 550);
      }
    }
  }

  return (
    <div>
      <div className="memory-header">
        <strong>Jogo da Memória</strong> - <span>Movimentos: {moves}</span>
        <button onClick={resetGame} type="button">
          Reiniciar
        </button>
      </div>

      <div className="memory-grid">
        {cards.map((card, idx) => {
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
