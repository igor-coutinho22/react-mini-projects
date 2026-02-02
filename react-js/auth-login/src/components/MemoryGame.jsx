import { useMemo, useState } from "react";

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame() {
  const symbols = ["🍎", "🚀", "🎧", "⚽", "🐶", "🌙", "🍕", "🎲"];

  const makeDeck = () => {
    const pairs = [...symbols, ...symbols].map((value, idx) => ({
      id: idx + "-" + value,
      value,
      matched: false,
    }));
    return shuffle(pairs);
  };

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
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, matched: true } : c
            )
          );
          setFlipped([]);
        }, 250);
      } else {
        setTimeout(() => setFlipped([]), 550);
      }
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
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

      {/* ✅ Mensagem no fim + botão ao lado */}
      {finished && (
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            padding: 12,
            border: "1px solid #c3b17c",
            borderRadius: 8,
            background: "#c3b17c",
          }}
        >
          <strong>🎉 Parabéns! Completaste o jogo.</strong>
          <button onClick={resetGame} type="button">
            Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
}
