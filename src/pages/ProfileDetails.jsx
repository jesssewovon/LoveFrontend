import { Link, useParams } from 'react-router';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

import { useSelector, useDispatch } from "react-redux";

import { signinPiketplace, setIsLoading } from '../store/userSlice';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from '../components/Loader';
import api from "../api";

export default function ProfileDetails() {
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);

  const [profile, setProfile] = useState({});

  const getProfileDetails = async () => {
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-profile-details/${id}`);
          console.log(`/get-profile-details`, res.data); // adjust to your API structure
          setProfile(res.data.profile); // adjust to your API structure
          setInterestsForm(res.data.interest_form); // adjust to your API structure
          setRelationshipGoals(res.data.relationship_goals); // adjust to your API structure
          setSexualOrientation(res.data.sexual_orientation_form); // adjust to your API structure
          setGenders(res.data.genders); // adjust to your API structure
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      console.log('profile', profile)
      dispatch(setIsLoading(false));
  };

  // Load data on page change
  useEffect(() => {
    getProfileDetails();
  }, []);

  if (isLoading) {
      return (
          <>
              <Header showBackButton={true} title={"Profile Details"} showWishList={false}/>
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
      <Header showBackButton={true} title={"Profile Details"} showWishList={false} classes={"bg-white"}/>
      <div className="page-content space-top p-b40">
        <div className="container">
          <div className="detail-area">
            <div className="dz-media-card style-2">
              <div className="dz-media">
                <img src={profile?.imageFirst} alt={profile.firstname}/>
              </div>
              <div className="dz-content">
                <div className="left-content">
                  <h4 className="title">{profile.firstname}, {profile.age}</h4>
                  <p className="mb-0"><i className="icon feather icon-map-pin"></i> 5 miles away</p>
                </div>
                <a href="javascript:void(0);" className="dz-icon"><i className="flaticon flaticon-star-1"></i></a>
              </div>
            </div>
            <div className="detail-bottom-area">
              {profile.about_me && (<div className="about">
                <h6 className="title">About me</h6>
                <p className="para-text">{profile.about_me}</p>					
              </div>)}
              <div className="intrests mb-3">
                <h6 className="title">Interests</h6>
                <ul className="dz-tag-list">
                  {/* <li> 
                    <div className="dz-tag">
                      <i className="icon feather icon-camera"></i>
                      <span>Photography</span>
                    </div>
                  </li> */}
                  {profile.interests?.map((name, index) => {
                      return (
                          <li key={index}>
                            <div className="dz-tag">
                              {/* <i className="icon feather icon-camera"></i> */}
                              <span>{t(name)}</span>
                            </div>
                          </li>
                      );
                  })}
                </ul>
              </div>
              <div className="languages mb-3">
                <h6 className="title">Languages</h6>
                <ul className="dz-tag-list">
                  <li> 
                    <div className="dz-tag">
                      <span>English</span>
                    </div>
                  </li>
                  <li> 
                    <div className="dz-tag">
                      <span>Spanish</span>
                    </div>
                  </li>
                  <li> 
                    <div className="dz-tag">
                      <span>German</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer fixed">
        <div className="dz-icon-box">
          <a href="home.html" className="icon dz-flex-box dislike"><i className="flaticon flaticon-cross font-18"></i></a>
          <a href="home.html" className="icon dz-flex-box super-like"><i className="fa-solid fa-star"></i></a>
          <a href="wishlist.html" className="icon dz-flex-box like"><i className="fa-solid fa-heart"></i></a>
        </div>
      </div>
    </>
  );
}