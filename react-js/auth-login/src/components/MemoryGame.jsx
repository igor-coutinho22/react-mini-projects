import { useMemo, useState } from "react";
import {
  FaAppleAlt,
  FaRocket,
  FaHeadphones,
  FaFutbol,
  FaDog,
  FaMoon,
  FaPizzaSlice,
  FaDice,
} from "react-icons/fa";

const SYMBOLS = [FaAppleAlt, FaRocket, FaHeadphones, FaFutbol, FaDog, FaMoon, FaPizzaSlice, FaDice];

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
  const pairs = [...SYMBOLS, ...SYMBOLS].map((Icon, idx) => ({
    id: `${idx}-${Icon.displayName || Icon.name}`,
    Icon,
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

      if (c1.Icon === c2.Icon) {
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
        <strong>Memory Game</strong> - <span>Moves: {moves}</span>
        <button onClick={resetGame} type="button">
          Reset
        </button>
      </div>

      <div className="memory-grid">
        {cards.map((card, idx) => {
          const isUp = card.matched || flipped.includes(idx);
          const Icon = card.Icon;
          return (
            <button
              key={card.id}
              className="memory-card"
              onClick={() => handleFlip(idx)}
              type="button"
              disabled={finished}
              style={{ opacity: finished ? 0.95 : 1 }}
            >
              {isUp ? <Icon /> : "?"}
            </button>
          );
        })}
      </div>

      {finished && (
        <div className="memory-finish">
          <strong> Congratulations! You've completed the game.</strong>
          <button onClick={resetGame} type="button">
            Play Again!
          </button>
        </div>
      )}
    </div>
  );
}
