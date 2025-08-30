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
