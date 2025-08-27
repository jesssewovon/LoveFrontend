import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export default function SwipeCard({ user, onSwipe, disabled }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const [isSwiped, setIsSwiped] = useState(false);

  const handleDragEnd = (_, info) => {
    if (disabled) return;

    if (info.offset.x > 150) {
      setIsSwiped(true);
      onSwipe?.("right", user);
    } else if (info.offset.x < -150) {
      setIsSwiped(true);
      onSwipe?.("left", user);
    } else if (info.offset.y < -150) {
      setIsSwiped(true);
      onSwipe?.("up", user);
    }
  };

  if (isSwiped) return null;

  return (
    <motion.div
      className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col items-center justify-start overflow-hidden cursor-grab"
      style={{ x, y, rotate, opacity, width: "100%", height: "100%" }}
      drag={disabled ? false : true}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {/* Image */}
      <motion.img
        src={user.imageFirst}
        alt={user.libelle}
        className="w-full h-3/4 object-cover cursor-grab"
        style={{ x, y, rotate, opacity, width: "100%", height: "75%", objectFit: 'cover' }}
        drag={disabled ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      />

      {/* User info */}
      <div className="p-4 w-full text-center">
        <h2 className="text-lg font-bold">{user.libelle}</h2>
        <p className="text-gray-600">{user.id} years</p>
      </div>
    </motion.div>
  );
}
