import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../api";
import { setIsLoading, signinPiketplace } from "../../store/userSlice";
import { navigate } from "../../navigationService";

import { updateField, resetForm } from "../../store/profileFormSlice";

export default function FirstName() {
    const [firstname, setFirstname] = useState('');
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn } = useSelector((state) => state.user);
    const profileForm = useSelector((state) => state.profileForm);
    
    useEffect(() => {
      if (isLoggedIn) {
        //navigate('/home')
      }
    });

    const handleChange = (e) => {
        dispatch(updateField({ field: e.target.name, value: e.target.value }));
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
                            <h3>Enter your name?</h3>
                        </div>
                        <div className="mb-2 input-group input-group-icon input-mini">
                            <div className="input-group-text">
                                <div className="input-icon">
                                    <i className="icon feather icon-user"></i>
                                </div>
                            </div>
                            <input type="text" value={profileForm.firstname} name="firstname" onChange={handleChange} className="form-control" placeholder="Enter first name"/>								
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer fixed bg-white">
                <div class="container">
                    <button disabled={profileForm.firstname==""} onClick={() => navigate('/registration/birth-date')} class="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Next</button>
                </div>
            </div>
        </>
    );
}
