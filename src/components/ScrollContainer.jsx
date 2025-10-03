import { NavLink, Link } from 'react-router';
import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "../ThemeContext";

import { useSelector, useDispatch } from "react-redux";

import { setIsDarkTheme, signinPiketplace, signoutPiketplace } from "../store/userSlice";
import { useTranslation } from 'react-i18next';
import SwitchLanguage from './SwitchLanguage';
function ScrollContainer({children}){
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);

  const prevInnerDivHeight = useRef(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerDivHeight - outerDivHeight,
        left: 0,
        behavior: prevInnerDivHeight.current ? "smooth" : "auto"
      });
    } else {
      setShowScrollButton(true);
    };

    prevInnerDivHeight.current = innerDivHeight;
  }, [children]);

  const handleScrollButtonClick = useCallback(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerDivHeight - outerDivHeight,
      left: 0,
      behavior: "smooth"
    });

    setShowScrollButton(false);
  }, []);
  
  return (
    <div
      style={{
        position: "relative",
        height: "100%"
      }}
    >
      <div
        ref={outerDiv}
        style={{
          position: "relative", 
          height: "100%", 
          overflow: "scroll"
         }}
      >
        <div
          ref={innerDiv}
          style={{
            position: "relative"
          }}
        >
          {children}
        </div>
      </div>
      <button
        style={{
          position: "absolute",
          backgroundColor: "red",
          color: "white",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? "auto" : "none"
        }}
        onClick={handleScrollButtonClick}
      >
        New message!
      </button>
    </div>
  )
};

export default ScrollContainer;