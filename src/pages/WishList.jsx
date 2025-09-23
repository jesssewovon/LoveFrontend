import { Link } from 'react-router';

import { useState, useRef, useEffect, useCallback } from "react";
import SwipeDeck from "../components/SwipeDeck";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useActivate, useUnactivate } from "react-activation";

import api from "../api";
import Header from "../components/Header";
import MenuBar from '../components/MenuBar';
import Loader from "../components/Loader";
import { setIsLoading, setReloadHomePage } from "../store/userSlice";
//import { setReactions } from "../store/profileFormSlice";
import { navigate } from "../navigationService";

export default function WishList({ savedScroll, onSaveScroll }) {

  const [crushes, setCrushes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const onScroll = (e) => {
      onSaveScroll(window.scrollY);
      console.log('onScroll', window.scrollY);
  };

  useActivate(() => {
    //alert("savedScroll "+savedScroll)
    window.scrollTo(0, savedScroll || 0);
    //window.addEventListener("scroll", onScroll);
    return () => {
      // save scroll before unmount
      //onSaveScroll(window.scrollY);
    };
  });
  // Clear interval when component is "deactivated" (but not unmounted)
  useUnactivate(() => {
    window.removeEventListener("scroll", onScroll);
    //console.log("useUnactivate savedScroll", savedScroll)
  });

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  
  // fetch users from API
  const fetchCrushes = async () => {
      console.log('fetchCrushes', page)
      setLoading(true);
      try {
          const res = await api.get(`get-wish-list?page=${page}`, {params: {}});
          //const res = await api.get(`https://testnet-backend.piketplace.com/api/v1/index-loading?page=${page}`);
          setCrushes(res.data.list.data); // adjust to your API structure
          if (res.data.list.data.length==0) {
              setPage((p) => 1);
          }
          window.scrollTo(0, savedScroll || 0);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      console.log('crushes', crushes)
      setLoading(false);
  };
  
  // Load data on page change
  useEffect(() => {
    fetchCrushes();
  }, [page]);
  /* return (
      <>
          <Header showBackButton={true} title={"WishList"} showWishList={false}/>
          <MenuBar/>
          <div className="page-content space-top p-b65">
              <div className="container fixed-full-area">
                  <div className="flex items-center justify-center h-screen bg-gray-100">
                      <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          COMING SOON
                      </div>
                  </div>
              </div>
          </div>
      </>
  ); */

  if (loading) {
      return (
          <>
              <Header showBackButton={true} title={"WishList"} showWishList={false}/>
              <MenuBar/>
              <div className="page-content space-top p-b65">
                  <div className="container fixed-full-area">
                      <div className="flex items-center justify-center h-screen bg-gray-100">
                          <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                          </div>
                      </div>
                  </div>
              </div>
          </>
      );
  }
  return (
    <>
      <Header showBackButton={true} title={"WishList"} showWishList={false}/>
      <MenuBar/>
      <div className="page-content space-top p-b65">
        <div className="container">
          <div className="row g-2" id="scroll-container">
            {crushes.map((reaction, index) => (
                <div key={reaction.id} className="col-6">
                  <div className="dz-media-card">
                    <a href="profile-detail.html">
                      <div className="dz-media">
                        <img src={reaction.crush?.imageFirst} alt={reaction.crush?.firstname}/>
                      </div>
                      <div className="dz-content">
                        <h6 className="title">{reaction.crush?.firstname}</h6>  
                        <span className="about">{reaction.crush?.about_me}</span> 
                      </div>
                    </a>
                  </div>
                </div>
              ))
            }
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic1.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Chelsea</h6>  
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic2.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Abby</h6> 
                    <span className="about">Chapman University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic3.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Javelle</h6>  
                    <span className="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic4.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Veronica</h6> 
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic5.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Richard</h6>  
                    <span className="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic6.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Chelsea</h6>  
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic4.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Veronica</h6> 
                    <span className="about">Chapman University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic1.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Richard</h6>  
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic2.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Veronica</h6> 
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic5.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Richard</h6>  
                    <span className="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}