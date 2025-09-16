import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // nice blur effect

import '../assets/scss/pages/_tinder-swiper.scss';

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
      {/* <motion.img
        src={user.imageFirst}
        alt={user.firstname}
        className="w-full h-3/4 object-cover cursor-grab"
        style={{ x, y, rotate, opacity, width: "100%", height: "100%", objectFit: 'cover' }}
        drag={disabled ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
      /> */}
      <LazyLoadImage
        src={user.imageFirst}
        alt={user.firstname}
        effect="blur"
        style={{ x, y, rotate, opacity, objectFit: 'cover', width: '100%', height: '100%' }}
        drag={disabled ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        width={'100%'}
        height={'100%'}
        placeholderSrc={"/loader.gif"}
      />

      {/* User info */}
      {/* <div className="p-4 w-full text-center" style={{width: "100%", height: "20%", display: "flex", alignItems: "flex-end", position: "absolute", bottom: "0", background: "linear-gradient(180deg, rgba(30, 34, 46, 0.00) 37.50%, rgba(30, 34, 46, 0.67) 44.84%, #1E222E 56.23%, #1E222E 100%)"}}>
        <h2 className="text-lg font-bold">{user.firstname}</h2>
        <p className="text-gray-600">{user.id} years</p>
      </div> */}
      <div className="" style={{position: "absolute", top: "0", width: "100%", height: "100%", backgroundImage: "linear-gradient(180deg, rgba(49, 70, 133, 0) 67.50%, rgba(30, 34, 46, 0.67) 84.84%, #1E222E 96.23%, #1E222E 100%)"}}>
        <div className="dz-content" style={{width: "100%", display: "flex", justifyContent: "space-between", padding: "0 15px", position: "absolute", bottom: "15px"}}>
            <div className="left-content">
                <span className="badge badge-primary d-inline-flex gap-1 mb-2"><i className="icon feather icon-map-pin"></i>Nearby</span>
                <h4 className="title" style={{color: 'white'}}><a>{user.firstname} , {user.age}</a></h4>
                <p className="mb-0"><i className="icon feather icon-map-pin"></i> {user.id} miles away</p>
            </div>
            <a className="dz-icon dz-sp-like" style={{width: "50px", height: "50px", borderRadius: "50%", background :"var(--btn-gradient)", color: "#fff"}}>
                <i className="flaticon flaticon-star-1" style={{fontSize: "28px"}}></i>
            </a>
        </div>
      </div>
      {/* ❌ LEFT */}
      <motion.div
        className="absolute top-10 right-5 px-4 py-4 border-4 border-green-500 text-green-500 text-2xl font-bold rounded-xl rotate-[20deg]"
        style={{ opacity: opacityLeft, position: "absolute", top: "20px", right: "5px" }}
      >
        ❌ Reject
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "50px", width: "50px", borderRadius: "50%", backgroundColor: "black"}}>
            ❌
        </div>
      </motion.div>

      {/* ❤️ RIGHT */}
      <motion.div
        className="absolute top-10 left-5 px-4 py-4 border-4 border-red-500 text-red-500 text-2xl font-bold rounded-xl rotate-[-20deg]"
        style={{ opacity: opacityRight, position: "absolute", top: "20px", left: "5px" }}
      >
        ❤️ Like
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "50px", width: "50px", borderRadius: "50%", backgroundColor: "#A8D789"}}>
            <i className="fa-solid fa-check" style={{fontSize: "20px", color: "#fff"}}></i>
        </div>
      </motion.div>

      {/* ⭐️ UP */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 border-4 border-blue-500 text-blue-500 text-2xl font-bold rounded-xl"
        style={{ opacity: opacityUp, position: "absolute", top: "30%", left: "40%", transform: "translateX: calc(1/2 * -100%) calc(1/2 * -100%)" }}
      >
        <span className="py-2 px-2" style={{background: "green"}}>⭐️ Super Like</span>
        
      </motion.div>
    </motion.div>
  );
}
