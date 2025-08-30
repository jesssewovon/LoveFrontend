import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../api";
import { setIsLoading, signinPiketplace } from "../../store/userSlice";
import { navigate } from "../../navigationService";

import { updateField, resetForm } from "../../store/profileFormSlice";

export default function RelationshipGoal() {
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn } = useSelector((state) => state.user);
    const profileForm = useSelector((state) => state.profileForm);
    
    useEffect(() => {
      if (isLoggedIn) {
        //navigate('/home')
      }
    });
    const handleRadioChange = (value) => {
        dispatch(updateField({ field: "relationship_goal", value: value }));
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
                            <h3>What are you looking for right now ?</h3>
                        </div>
                        <div className="radio style-2">
                            <label className="radio-label" htmlFor="women">
                                <input type="radio" name="radio2" value="women"
                                    id="women" 
                                    checked={
                                        profileForm.relationship_goal ===
                                        "long_term_partner"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "long_term_partner"
                                        )
                                    }/>
                                <span className="checkmark">						
                                    <span className="text">Long-term partner</span>
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label" htmlFor="long_term_open_to_short">
                                <input
                                    type="radio" name="radio2" value="long_term_open_to_short"
                                    id="long_term_open_to_short"
                                    checked={
                                        profileForm.relationship_goal ===
                                        "long_term_open_to_short"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "long_term_open_to_short"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">Long-term, open to short</span>
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="radio2" value="short_term_open_to_long"
                                    id="short_term_open_to_long"
                                    checked={
                                        profileForm.relationship_goal ===
                                        "short_term_open_to_long"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "short_term_open_to_long"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">Short-term, open to long</span>	
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="radio2" value="short_term_fun"
                                    id="short_term_fun"
                                    checked={
                                        profileForm.relationship_goal ===
                                        "short_term_fun"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "short_term_fun"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">Short-term fun</span>	
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="radio2" value="new_friends"
                                    id="new_friends"
                                    checked={
                                        profileForm.relationship_goal ===
                                        "new_friends"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "new_friends"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">New friends</span>	
                                    <span className="check"></span>							
                                </span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="radio2" value="still_figuring_it_out"
                                    id="still_figuring_it_out"
                                    checked={
                                        profileForm.relationship_goal ===
                                        "still_figuring_it_out"
                                    }
                                    onChange={() =>
                                        handleRadioChange(
                                            "still_figuring_it_out"
                                        )
                                    }/>
                                <span className="checkmark">
                                    <span className="text">Stil figuring it out</span>	
                                    <span className="check"></span>							
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer fixed bg-white">
                <div className="container">
                    <button disabled={profileForm.relationship_goal==""} onClick={() => navigate('/registration-images')} className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Next</button>
                </div>
            </div>
        </>
    );
}
