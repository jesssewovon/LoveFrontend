import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../api";
import { setIsLoading, signinPiketplace } from "../../store/userSlice";
import { navigate } from "../../navigationService";

import { updateField, resetForm } from "../../store/profileFormSlice";

export default function InterestedGender() {
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn } = useSelector((state) => state.user);
    const profileForm = useSelector((state) => state.profileForm);
    
    useEffect(() => {
      if (isLoggedIn) {
        //navigate('/home')
      }
    });
    const handleRadioChange = (value) => {
        dispatch(updateField({ field: "date_filter_gender", value: value }));
    };

    return (
        <>
            <div className="page-content">
                <div className="container">
                    <div className="account-area">
                        <a onClick={() => navigate(-1)} className="back-btn dz-flex-box">
                            <i className="icon feather icon-chevron-left"></i>
                        </a>
                        <div className="section-head ps-0">
                            <h3>Who are you interested in seeing ?</h3>
                        </div>
                        <div className="radio style-2">
                            <label className="radio-label" htmlFor="women">
                                <input type="radio" name="radio2" value="women"
                                    id="women" 
                                    checked={
                                        profileForm.date_filter_gender ===
                                        "women"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "women"
                                        )
                                    }/>
                                <span className="checkmark">						
                                    <span className="text">Women</span>
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label" htmlFor="men">
                                <input
                                    type="radio" name="radio2" value="men"
                                    id="men"
                                    checked={
                                        profileForm.date_filter_gender ===
                                        "men"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "men"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">Men</span>
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="radio2" value="other"
                                    id="other"
                                    checked={
                                        profileForm.date_filter_gender ===
                                        "other"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "other"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">Other</span>	
                                    <span className="check"></span>							
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer fixed bg-white">
                <div className="container">
                    <button disabled={profileForm.date_filter_gender==""} onClick={() => navigate('/registration/relationship-goal')} className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Next</button>
                </div>
            </div>
        </>
    );
}
