import { Link } from 'react-router';
import { useState, useRef, useEffect, useCallback } from "react";
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setIsSaving, hideOffcanvas, setUser } from "../store/userSlice";
import { updateProfile } from "../store/profileFormSlice";
import api from "../api";
import Loader from '../components/Loader';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useTranslation } from 'react-i18next';
import { navigate } from "../navigationService";
import Button from 'react-bootstrap/Button';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

export default function EditProfile() {
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const { isLoggedIn, isLoading, user, isSaving } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [genders, setGenders] = useState([]);

  const [showAddressOffCanvas, setShowAddressOffCanvas] = useState(false);
  const handleAddressOffCanvasClose = () => setShowAddressOffCanvas(false);
  const handleAddressOffCanvasShow = () => setShowAddressOffCanvas(true);

  const [showGenderInterestedOffCanvas, setShowGenderInterestedOffCanvas] = useState(false);
  const handleGenderInterestedOffCanvasClose = () => setShowGenderInterestedOffCanvas(false);
  const handleGenderInterestedOffCanvasShow = () => setShowGenderInterestedOffCanvas(true);

  const onSlide = (render, handle, value, un, percent) => {
    console.log("onSlide", render, handle, value, un, percent)

    setProfile({ ...profile,
      interested_min_age: value[0],
      interested_max_age: value[1]
    });
    console.log('value slider', value, profile)
  };

  // Get my profile from API
  const getMyProfile = async () => {
      dispatch(setIsSaving(false));
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`get-my-profile`);
          console.log(`get-my-profile`, res.data); // adjust to your API structure
          setProfile(res.data.profile); // adjust to your API structure
          setGenders(res.data.genders); // adjust to your API structure
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      console.log('profile', profile)
      dispatch(setIsLoading(false));
  };

  // Load data on page change
  useEffect(() => {
    getMyProfile();
  }, []);

  const handleAddressChange = (e) => {
    e.preventDefault(); // prevent the default action
    setProfile({ ...profile, address: e.target.value });
  };

  const handleGenderInterestedChange = (gender) => {
    setProfile({ ...profile, interested_gender: gender });
    setShowGenderInterestedOffCanvas(false)
  };
  
  const saveProfile = () => {
    dispatch(updateProfile(profile));
  };

  if (isLoading) {
      return (
          <>
              <Header showBackButton={true} title={"Settings"} showWishList={false}/>
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
      <Header showBackButton={true} title={"Settings"} showWishList={false}/>
      <div className="page-content space-top p-b65">
        <div className="container">
          <h6 className="title">Discovery Setting</h6>
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Location</h6>
            </div>
            <div className="card-body">
              <a onClick={handleAddressOffCanvasShow} className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom3" aria-controls="offcanvasBottom">
                <i className="icon dz-flex-box feather icon-map-pin"></i>
                <span>{profile.address}</span>
              </a>
            </div>
          </div>
          <h6 className="title">Other</h6>
          <div className="card style-1" style={{border: '1px solid var(--border-color)'}}>
            <div className="card-header">
              <h6 className="title font-w400 font-14 mb-0">Maximum Distance</h6>
            </div>
            <div className="card-body">
              {profile?.interested_max_distance && (<div class="mb-3 title font-w600 font-16">
                <span class="example-val title slider-margin-value-min" style={{color: "var(--title)"}}>Up to  {profile?.interested_max_distance} kilometers only</span>
              </div>)}
              <div style={{ width: "100%", margin: "15px auto" }}>
                <Nouislider
                  /* start={[interested_max_distance]} */         // ✅ single value
                  start={profile?.interested_max_distance??80}         // ✅ single value
                  range={{ min: 18, max: 100 }}
                  connect={[true, false]} // ✅ fill only before the handle
                  onSlide={(rendered) => setProfile({...profile, interested_max_distance: Math.round(rendered[0])})}
                />
              </div>
            </div>
          </div>
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Show Me</h6>
            </div>
            <div className="card-body">
              <a onClick={handleGenderInterestedOffCanvasShow} className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom4" aria-controls="offcanvasBottom">
                <span>{profile.interested_gender}</span>
                <i className="icon feather dz-flex-box icon-chevron-right ms-auto me-0"></i>
              </a>
            </div>
          </div>
          <div className="card style-1 mb-0" style={{border: '1px solid var(--border-color)'}}>
            <div className="card-header">
              <h6 className="title font-w400 font-14 mb-0">Age range</h6>
            </div>
            <div className="card-body">
              <div class="mb-3 title font-w600 font-16">
                <span class="example-val title slider-margin-value-min" style={{color: "var(--title)"}}>Between {profile?.interested_min_age} </span>
                <span class="example-val title slider-margin-value-max" style={{color: "var(--title)"}}>and {profile?.interested_max_age}</span>
              </div>
              <div style={{margin: "auto 10px"}}>
                <Nouislider range={{ min: 18, max: 82 }} start={[18, 50]} 
                accessibility
                step={1}
                onSlide={onSlide} connect/>
              </div>
            </div>
          </div>
        </div> 
      </div>

      <div className="footer fixed">
        <div className="container">
          <a disabled={isSaving} onClick={saveProfile} className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">
            Save <Loader/>
          </a>
        </div>
      </div>

      <Offcanvas placement={'bottom'} show={showAddressOffCanvas} onHide={handleAddressOffCanvasClose}>
        <Offcanvas.Header closeButton className="share-style">
          <Offcanvas.Title>
            <h6 className="title mb-0">Location</h6>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div class="input-group input-group-icon">
            <div class="input-group-text">
              <div class="input-icon">
                <i class="icon feather icon-map-pin"></i>
              </div>
            </div>
            <input type="text" class="form-control" value={profile.address} onChange={handleAddressChange}/>
          </div>
          <button onClick={handleAddressOffCanvasClose} class="btn btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">
            {t('close')}
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    
      <Offcanvas placement={'bottom'} show={showGenderInterestedOffCanvas} onHide={handleGenderInterestedOffCanvasClose}>
        <Offcanvas.Header closeButton className="share-style">
          <Offcanvas.Title>
            <h6 className="title mb-0">Show me</h6>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="radio style-2">
            {genders?.map(( name , index) => {
                return (
                    <label key={index} className="radio-label" htmlFor={name}>
                        <input type="radio" name="radio2" value={name}
                            id={name} 
                            checked={
                                profile.interested_gender ===
                                name
                            }
                            onChange={() =>
                                handleGenderInterestedChange(
                                    name
                                )
                            }/>
                        <span className="checkmark">						
                            <span className="text">{name}</span>
                            <span className="check"></span>							
                        </span>
                    </label>
                );
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}