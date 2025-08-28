import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export default function SwipeCard({ user, onSwipe, disabled }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  // Opacity for indicators
  const opacityLeft = useTransform(x, [-80, 0], [1, 0]);
  const opacityRight = useTransform(x, [0, 80], [0, 1]);
  const opacityUp = useTransform(y, [-80, 0], [1, 0]);

  const [dragging, setDragging] = useState(false);

  const [isSwiped, setIsSwiped] = useState(false);

  const handleDragEnd = (_, info) => {
    if (disabled) return;

    if (info.offset.x > 80) {
      setIsSwiped(true);
      onSwipe?.("right", user);
    } else if (info.offset.x < -80) {
      setIsSwiped(true);
      onSwipe?.("left", user);
    } else if (info.offset.y < -80) {
      setIsSwiped(true);
      onSwipe?.("up", user);
    }
  };

  if (isSwiped) return null;

  return (
    <motion.div
      className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col items-center justify-start overflow-hidden cursor-grab"
      style={{ x, y, rotate, opacity, width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "20px", position: "relative" }}
      //drag={disabled ? false : true}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragStart={() => setDragging(true)}
      onDragEnd={(e, info) => {
        setDragging(false);
        handleDragEnd(e, info);
      }}
    >
      {/* Image */}
      <motion.img
        src={user.imageFirst}
        alt={user.libelle}
        className="w-full h-3/4 object-cover cursor-grab"
        style={{ x, y, rotate, opacity, width: "100%", height: "100%", objectFit: 'cover' }}
        drag={disabled ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
      />

      {/* User info */}
      <div className="p-4 w-full text-center" style={{width: "100%", position: "absolute", bottom: "0", background: "rgba(0,0,0,0.5)"}}>
        <h2 className="text-lg font-bold">{user.libelle}</h2>
        <p className="text-gray-600">{user.id} years</p>
      </div>
      {/* ❌ LEFT */}
      <motion.div
        className="absolute top-10 left-5 px-4 py-2 border-4 border-red-500 text-red-500 text-2xl font-bold rounded-xl rotate-[-20deg]"
        style={{ opacity: opacityLeft, position: "absolute", top: "10px", left: "5px" }}
      >
        ❌ Reject
      </motion.div>

      {/* ❤️ RIGHT */}
      <motion.div
        className="absolute top-10 right-5 px-4 py-2 border-4 border-green-500 text-green-500 text-2xl font-bold rounded-xl rotate-[20deg]"
        style={{ opacity: opacityRight, position: "absolute", top: "10px", right: "5px" }}
      >
        ❤️ Like
      </motion.div>

      {/* ⭐️ UP */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 border-4 border-blue-500 text-blue-500 text-2xl font-bold rounded-xl"
        style={{ opacity: opacityUp, position: "absolute", top: "20px", left: "50%", transform: "translateX: calc(1/2 * -100%) calc(1/2 * -100%)" }}
      >
        ⭐️ Super Like
      </motion.div>
    </motion.div>
  );
}
