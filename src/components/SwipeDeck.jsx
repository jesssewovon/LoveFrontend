import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";

export default function SwipeDeck({ key, users = [], onSwipe }) {
  const [cards, setCards] = useState(users);

  // 🔄 Sync local cards whenever parent `users` changes
  useEffect(() => {
    setCards(users);
  }, [users]);

  const handleCardSwipe = (direction, user) => {
    onSwipe(direction, user, cards.length);
    // remove swiped card from local stack
    setCards((prev) => prev.filter((c) => c.id !== user.id));
  };

  return (
    <div className="relative w-[350px] h-[500px]">
      {cards
        .map((user, index) => (
          <SwipeCard
            key={user.id}
            user={user}
            onSwipe={handleCardSwipe}
            style={{ zIndex: cards.length - index }}
          />
        ))
        .reverse()}
    </div>
  );
}
