import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../api";
import { setIsLoading, signinPiketplace } from "../../store/userSlice";
import { navigate } from "../../navigationService";

import { updateField, resetForm } from "../../store/profileFormSlice";

export default function Gender() {
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn } = useSelector((state) => state.user);
    const profileForm = useSelector((state) => state.profileForm);
    
    useEffect(() => {
      if (isLoggedIn) {
        //navigate('/home')
      }
    });
    const handleRadioChange = (value) => {
        dispatch(updateField({ field: "gender", value: value }));
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
                            <h3>What's your gender ?</h3>
                        </div>
                        <div className="radio style-2">
                            <label className="radio-label" htmlFor="women">
                                <input type="radio" name="radio2" value="women"
                                    id="women" 
                                    checked={
                                        profileForm.gender ===
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
                                        profileForm.gender ===
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
                            <label className="radio-label" htmlFor="other">
                                <input type="radio" name="radio2" value="other"
                                    id="other"
                                    checked={
                                        profileForm.gender ===
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
                    <button disabled={profileForm.gender==""} onClick={() => navigate('/registration/sexual-orientation')} className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Next</button>
                </div>
            </div>
        </>
    );
}
