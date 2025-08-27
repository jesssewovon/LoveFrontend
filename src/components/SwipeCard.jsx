import { useState, useRef } from "react";
import classNames from "classnames"; // npm install classnames

export default function SwipeCard({ onSwipe, user, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);
  const [hide, setHide] = useState(false);
  const [direction, setDirection] = useState("");
  const [transform, setTransform] = useState("");
  const cardRef = useRef(null);

  const decisionVal = 80;

  // Drag start
  const handleDragStart = (e) => {
    //console.log('e', e)
    if (animating) return;
    const startX = e.pageX || e.touches[0].pageX;
    const startY = e.pageY || e.touches[0].pageY;

    const handleMove = (moveEvent) => {
      const x = moveEvent.pageX || moveEvent.touches[0].pageX;
      const y = moveEvent.pageY || moveEvent.touches[0].pageY;
      //setPosition({ x: x - startX, y: startY - y });
      position.x = x - startX
      position.y = startY - y
      //console.log('swipp', x - startX, moveEvent, position)
      //alert('swipp')
      setTransform(`translate(${position.x}px, -${position.y}px) rotate(${position.x / 10}deg)`)
    };

    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);

      releaseCard();
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);
  };

  // Release logic
  const releaseCard = () => {
    let { x, y } = position;

    //console.log('position', position)

    //alert('releaseCard '+decisionVal+"-"+x+"-"+y)

    if (Math.abs(x) > Math.abs(y)) {
      // Horizontal swipe
      if (x >= decisionVal) handleSwipe("to-right");
      else if (x <= -decisionVal) handleSwipe("to-left");
      else resetCard();
    } else {
      // Vertical swipe
      if (y >= decisionVal) handleSwipe("to-upside");
      else if (y <= -decisionVal) handleSwipe("to-downside");
      else resetCard();
    }
    setTimeout(() => {
      document.querySelectorAll('.dzSwipe_card').forEach(card => {
        card.removeAttribute("style");        // clear inline style
        card.classList.remove("reset");       // remove 'reset' class

        card.querySelectorAll('.dzSwipe_card__option').forEach(option => {
          option.removeAttribute("style");    // clear inline style
        });
      });
    }, 600);
  };

  const handleSwipe = (direction) => {
    setAnimating(true);
    setDirection(direction);
    if (onSwipe) {
      setHide(true)
      onSwipe(direction, "moikjn")
    };

    // animate out
    const endPos =
      direction === "to-right"
        ? { x: 500, y: position.y }
        : direction === "to-left"
        ? { x: -500, y: position.y }
        : direction === "to-upside"
        ? { x: position.x, y: 500 }
        : { x: position.x, y: -500 };

    setPosition(endPos);

    setTimeout(() => {
      setAnimating(false);
      setDirection("")
      setPosition({ x: 0, y: 0 });
    }, 300);
    //alert('handleSwipe end: '+direction)
  };

  const resetCard = () => {
    setAnimating(true);
    setPosition({ x: 0, y: 0 });
    setTimeout(() => setAnimating(false), 300);
  };

  /*const transform = `translate(${position.x}px, -${position.y}px) rotate(${
    position.x / 10
  }deg)`;*/

  return (
    <div
      ref={cardRef}
      className={classNames("dzSwipe_card", { inactive: animating }, hide?"below":"")}
      style={{
        transform,
        transition: animating ? "all 0.3s ease" : "none",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}>
        <div class="dz-media">
          <img src={user.imageFirst} alt="" style={{objectFit: "cover",width: "600px", height: "100%", borderRadius: "18px"}} />
        </div>
        <div class="dz-content">
          <div class="left-content">
            <span class="badge badge-primary d-inline-flex gap-1 mb-2"><i class="icon feather icon-map-pin"></i>Nearby</span>
            <h4 class="title"><a href="profile-detail.html">{user.libelle} , 24</a></h4>
            <p class="mb-0"><i class="icon feather icon-map-pin"></i> 3 miles away</p>
          </div>
          <a onClick={() => handleSwipe("to-upside")} class="dz-icon dz-sp-like"><i class="flaticon flaticon-star-1"></i></a>
        </div>
        <div
          className="dzSwipe_card__option dzReject"
          style={{ opacity: position.x < 0 ? Math.abs(position.x) / 100 : 0 }}
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div
          className="dzSwipe_card__option dzLike"
          style={{ opacity: position.x > 0 ? position.x / 100 : 0 }}
        >
          <i class="fa-solid fa-check"></i>
        </div>
        <div
          className="dzSwipe_card__option dzSuperlike"
          style={{ opacity: position.y > 0 ? position.y / 100 : 0 }}
        >
          ⭐ <h5 class="title mb-0">Super Like</h5>
        </div>
        <div class="dzSwipe_card__drag"></div>
      {/* Card content */}
      {children}

      {/* Overlays */}
      
    </div>
  );
}
