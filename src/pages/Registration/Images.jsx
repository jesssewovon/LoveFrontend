import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../api";
import { setIsLoading, signinPiketplace } from "../../store/userSlice";
import { navigate } from "../../navigationService";

import { updateField, resetForm } from "../../store/profileFormSlice";

export default function Images() {
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn } = useSelector((state) => state.user);
    const profileForm = useSelector((state) => state.profileForm);
    
    useEffect(() => {
      if (isLoggedIn) {
        //navigate('/home')
      }
    });
    const handleRadioChange = (value) => {
        dispatch(updateField({ field: "images", value: value }));
    };

    return (
        <>
            <div className="page-content p-b70">
                <div className="container">
                    <div className="account-area">
                        <a onClick={() => navigate(-1)} className="back-btn dz-flex-box">
                            <i className="icon feather icon-chevron-left"></i>
                        </a>
                        <div className="section-head ps-0">
                            <h3>Add your recent pics</h3>
                        </div>
                        <div className="row g-3" data-masonry='{"percentPosition": true }'>
                            <div className="col-8">
                                <div className="dz-drop-box">
                                    <div className="drop-bx bx-lg">
                                        <div className="imagePreview" style={{backgroundImage: "url(/images/recent-pic/drop-bx.png)"}}>
                                            <div  className="remove-img remove-btn d-none"><i className="icon feather icon-x"></i></div>
                                            <input type='file' className="form-control d-none imageUpload"  id="imageUpload" accept=".png, .jpg, .jpeg"/>
                                            <label htmlFor="imageUpload"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="dz-drop-box">
                                            <img src="/images/recent-pic/drop-bx.png" alt=""/>
                                            <div className="drop-bx">
                                                <div className="imagePreview" style={{backgroundImage: "url(/images/recent-pic/drop-bx.png)"}}>
                                                    <div  className="remove-img remove-btn d-none"><i className="icon feather icon-x"></i></div>
                                                    <input type='file' className="form-control d-none imageUpload"  id="imageUpload2" accept=".png, .jpg, .jpeg"/>
                                                    <label htmlFor="imageUpload2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="dz-drop-box">
                                            <img src="/images/recent-pic/drop-bx.png" alt=""/>
                                            <div className="drop-bx">
                                                <div className="imagePreview" style={{backgroundImage: "url(/images/recent-pic/drop-bx.png)"}}>
                                                    <div  className="remove-img remove-btn d-none"><i className="icon feather icon-x"></i></div>
                                                    <input type='file' className="form-control d-none imageUpload"  id="imageUpload3" accept=".png, .jpg, .jpeg"/>
                                                    <label htmlFor="imageUpload3"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="dz-drop-box">
                                    <img src="/images/recent-pic/drop-bx.png" alt=""/>
                                    <div className="drop-bx">
                                        <div className="imagePreview" style={{backgroundImage: "url(/images/recent-pic/drop-bx.png)"}}>
                                            <div  className="remove-img remove-btn d-none"><i className="icon feather icon-x"></i></div>
                                            <input type='file' className="form-control d-none imageUpload"  id="imageUpload4" accept=".png, .jpg, .jpeg"/>
                                            <label htmlFor="imageUpload4"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="dz-drop-box">
                                    <img src="/images/recent-pic/drop-bx.png" alt=""/>
                                    <div className="drop-bx">
                                        <div className="imagePreview" style={{backgroundImage: "url(/images/recent-pic/drop-bx.png)"}}>
                                            <div  className="remove-img remove-btn d-none"><i className="icon feather icon-x"></i></div>
                                            <input type='file' className="form-control d-none imageUpload"  id="imageUpload5" accept=".png, .jpg, .jpeg"/>
                                            <label htmlFor="imageUpload5"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="dz-drop-box">
                                    <img src="/images/recent-pic/drop-bx.png" alt=""/>
                                    <div className="drop-bx">
                                        <div className="imagePreview" style={{backgroundImage: "url(/images/recent-pic/drop-bx.png)"}}>
                                            <div  className="remove-img remove-btn d-none"><i className="icon feather icon-x"></i></div>
                                            <input type='file' className="form-control d-none imageUpload"  id="imageUpload6" accept=".png, .jpg, .jpeg"/>
                                            <label htmlFor="imageUpload6"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer fixed bg-white">
                <div className="container">
                    <button disabled={profileForm.images?.length==0} onClick={() => navigate('/registration/relationship-goal')} class="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Next</button>
                </div>
            </div>
        </>
    );
}
