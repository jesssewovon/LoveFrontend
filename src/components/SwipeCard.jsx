import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // nice blur effect

import '../assets/scss/pages/_tinder-swiper.scss';

import { navigate } from "../navigationService";

import { setIsLoading, signinPiketplace, setGeolocation,
    changeLanguage, setIsSaving, showPiAdRewarded, 
} from "../store/userSlice";

import Loader from "../components/Loader";

export default function SwipeCard({ profile, onSwipe, disabled, remainingFreeSwiping, isSwipingUnlimited, subscriptionData }) {
  const dispatch = useDispatch();
  const {t} = useTranslation()

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
    if (!subscriptionData['unlimited likes'] && remainingFreeSwiping <= 0) return;
    if (disabled) return;

    if (info.offset.x > 80) {
      setIsSwiped(true);
      onSwipe?.("right", profile);
    } else if (info.offset.x < -80) {
      setIsSwiped(true);
      onSwipe?.("left", profile);
    } else if (info.offset.y < -80) {
      setIsSwiped(true);
      onSwipe?.("up", profile);
    }
  };

  // Programmatic swipe
  const triggerSwipe = (direction) => {
    //alert('here right Programmatic')
    if (disabled || isSwiped) return;
    //alert('fgbb')
    let toX = 0;
    let toY = 0;

    if (direction === "right") toX = 300;
    if (direction === "left") toX = -300;
    if (direction === "up") toY = -300;

    // Animate motion values
    animate(x, toX, { duration: 0.4 });
    animate(y, toY, { duration: 0.4 });

    // Fire callback after short delay
    setTimeout(() => {
      setIsSwiped(true);
      onSwipe?.(direction, profile);
    }, 400);
  };
  const test_func = () => {
    alert('here right')
    console.log('kkjkj')
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
        src={profile.imageFirst}
        alt={profile.firstname}
        className="w-full h-3/4 object-cover cursor-grab"
        style={{ x, y, rotate, opacity, width: "100%", height: "100%", objectFit: 'cover' }}
        drag={disabled ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
      /> */}
      <LazyLoadImage
        src={profile.imageFirst}
        alt={profile.firstname}
        effect="blur"
        style={{ x, y, rotate, opacity, objectFit: 'cover', width: '100%', height: '100%', filter: `blur(${!subscriptionData['unlimited likes'] && remainingFreeSwiping<=0?20:0}px)` }}
        drag={disabled ? 'false' : 'true'}
        dragconstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragelastic={0.5}
        onDragEnd={handleDragEnd}
        width={'100%'}
        height={'100%'}
        placeholderSrc={"/loader.gif"}
      />

      {/* profile info */}
      {/* <div className="p-4 w-full text-center" style={{width: "100%", height: "20%", display: "flex", alignItems: "flex-end", position: "absolute", bottom: "0", background: "linear-gradient(180deg, rgba(30, 34, 46, 0.00) 37.50%, rgba(30, 34, 46, 0.67) 44.84%, #1E222E 56.23%, #1E222E 100%)"}}>
        <h2 className="text-lg font-bold">{profile.firstname}</h2>
        <p className="text-gray-600">{profile.id} years</p>
      </div> */}
      <div className="dz-gallery-slider" style={{position: "absolute", top: "0", width: "100%", height: "100%", backgroundImage: "linear-gradient(180deg, rgba(49, 70, 133, 0) 67.50%, rgba(30, 34, 46, 0.67) 84.84%, #1E222E 96.23%, #1E222E 100%)"}}>
        <div className="dz-content" style={{width: "100%", display: "flex", justifyContent: "space-between", padding: "0 15px", position: "absolute", bottom: "15px"}}>
            <div onClick={() => navigate(`/profile-details/${profile.id}`)} className="left-content">
                {profile.isNew===true?
                  (<span className="badge badge-primary d-inline-flex gap-1 mb-2">
                    New here
                  </span>):
                  (
                    profile.distance?
                    (<span className="badge badge-primary d-inline-flex gap-1 mb-2">
                      <i className="icon feather icon-map-pin"></i>
                      Nearby
                    </span>):""
                  )
                }
                <h4 className={`title ${!subscriptionData['unlimited likes'] && remainingFreeSwiping<=0?'text-blur':''}`} style={{color: 'white'}}><a>{profile.firstname} , {profile.age} </a></h4>
                {profile.distance && (<p className={`mb-0 ${!subscriptionData['unlimited likes'] && remainingFreeSwiping<=0?'text-blur':''}`}>
                  <i className="icon feather icon-map-pin"></i>
                  &nbsp; {profile.distance} km away
                </p>)}
                {profile.interests?.length && (
                  <ul class="intrest">
                    <li><span class="badge">Photography</span></li>
                    {profile.interests?.map((name, index) => {
                        return (
                            <li key={index}><span class="badge">{name}</span></li>
                        );
                    })}
                  </ul>
                )}
            </div>
            <a onClick={()=>{triggerSwipe("right")}} className="dz-icon dz-sp-like" style={{width: "50px", height: "50px", borderRadius: "50%", background :"var(--btn-gradient)", color: "#fff"}}>
                <i className="flaticon flaticon-heart" style={{fontSize: "28px"}}></i>
            </a>
        </div>
      </div>
      {/* ❌ LEFT */}
      <motion.div
        className="absolute right-5 px-4 py-4 border-4 border-green-500 text-green-500 text-2xl font-bold rounded-xl rotate-[20deg]"
        style={{ opacity: opacityLeft, position: "absolute", top: "60px", right: "5px"}}
      >
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100px", width: "100px", borderRadius: "50%", backgroundColor: "#FF945A", color: "#fff", fontSize: "50px"}}>
            ❌
        </div>
        {/* <span className="p-2" style={{fontSize: "20px", backgroundColor: "#000000aa"}}>
          Dislike
        </span> */}
      </motion.div>

      {/* ❤️ RIGHT */}
      <motion.div
        className="absolute left-5 px-4 py-4 border-4 border-red-500 text-red-500 text-2xl font-bold rounded-xl rotate-[-20deg]"
        style={{ opacity: opacityRight, position: "absolute", top: "60px", left: "5px" }}
      >
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100px", width: "100px", borderRadius: "50%", backgroundColor: "#A8D789", fontSize: "50px"}}>
            <i className="fa-solid fa-check" style={{fontSize: "50px", color: "#fff"}}></i>
        </div>
        {/* ❤️ Like */}
      </motion.div>

      {/* ⭐️ UP */}
      {/* <motion.div
        className="absolute left-1/2 -translate-x-1/2 px-4 py-2 border-4 border-blue-500 text-blue-500 text-2xl font-bold rounded-xl"
        style={{ opacity: opacityUp, position: "absolute", top: "30%", left: "40%", transform: "translateX: calc(1/2 * -100%) calc(1/2 * -100%)" }}
      >
        <span className="py-2 px-2" style={{background: "green"}}>⭐️ Super Like</span>
        
      </motion.div> */}
      {!subscriptionData['unlimited likes'] && remainingFreeSwiping <= 0 && (<div className="p-1" style={{position: "absolute", zIndex: "9", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)"}}>
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div className="" style={{width: "100%", textAlign: "center"}}>
                    <label className="my-4" style={{}}>Action needed</label>
                    <div className="" style={{}}>
                        <button onClick={() => dispatch(showPiAdRewarded())} className="btn btn-gradient w-100 btn-shadow rounded-xl my-2">
                            {t('unlock with PiAd')} <Loader/>
                        </button>
                        <button onClick={() => navigate('/subscription')} className="btn btn-light w-100 btn-shadow rounded-xl my-2">
                            {t('subsrcibe to unlock')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>)}
    </motion.div>
  );
}
