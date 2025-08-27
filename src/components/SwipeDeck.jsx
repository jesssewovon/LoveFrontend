"use client";

import { useState } from "react";
import SwipeCard from "./SwipeCard";

export default function SwipeDeck({ users, onSwipe }) {
  const [cards, setCards] = useState(users);

  const handleSwipe = (direction, user) => {
    // remove top card
    setCards((prev) => prev.filter((c) => c.id !== user.id));
    // bubble up swipe event
    onSwipe?.(direction, user);
  };

  return (
    <div className="relative w-[600px] h-[800px]" style={{position: "relative", width: "300px", height: "400px"}}>
      {cards.map((user, index) => {
        const isTop = index === cards.length - 1;
        return (
          <div
            key={user.id}
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: index, position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
          >
            <SwipeCard
              user={user}
              onSwipe={handleSwipe}
              disabled={!isTop} // only top card can move
            />
          </div>
        );
      })}
    </div>
  );
}
