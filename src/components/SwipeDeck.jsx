import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";

export default function SwipeDeck({ profiles = [], onSwipe, remainingFreeSwiping, isSwipingUnlimited, subscriptionData }) {
  const [cards, setCards] = useState(profiles);

  // 🔄 Sync local cards whenever parent `profiles` changes
  useEffect(() => {
    setCards(profiles);
  }, [profiles]);

  const handleCardSwipe = (direction, profile) => {
    onSwipe(direction, profile, cards.length);
    // remove swiped card from local stack
    setCards((prev) => prev.filter((c) => c.id !== profile.id));
  };
  return (
    <div className="" style={{position: "relative", width: "100%", height: 'calc(100vh - 140px)', overflow: "hidden", borderRadius: "20px"}}>
      {cards
        .map((profile, index) => (
          <SwipeCard
            key={profile.id}
            profile={profile}
            onSwipe={handleCardSwipe}
            remainingFreeSwiping={remainingFreeSwiping}
            isSwipingUnlimited={isSwipingUnlimited}
            subscriptionData={subscriptionData}
            style={{ zIndex: cards.length - index }}
          />
        ))
        .reverse()}
    </div>
  );
}
