import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../api";
import { setIsLoading, signinPiketplace } from "../store/userSlice";
//import { navigate } from "../navigationService";

import Loader from '../components/Loader';
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Landing() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const { isLoading, isLoggedIn, isSaving } = useSelector((state) => state.user);
    const findSomeone = async () => {
        dispatch(signinPiketplace());
    };
    useEffect(() => {
      if (isLoggedIn) {
        //navigate('/home')
      }
    });

    return (
        <>
            <div className="content-body">
                <div className="welcome-area bg-image">
                    <div className="welcome-inner">
                        <div className="dz-media">
                            <img src="/images/onboarding/pic1.png" alt=""/>
                        </div>
                        <Swiper
                            spaceBetween={30}
                            speed={1500}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={false}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper get-started"
                        >
                            <SwiperSlide>
                                <div className="slide-info">
                                    <div className="started">
                                        <h2 className="title mb-3">Start Your Dating Story</h2>
                                        <p>Your companion for meaningful connections</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slide-info">
                                    <div className="started">
                                        <h2 className="title mb-3">Begin Your Chapter of Love</h2>
                                        <p>Embrace the dating world armed with tools and support</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slide-info">
                                    <div className="started">
                                        <h2 className="title mb-3">Your Journey of Connection</h2>
                                        <p>Explore essentials and delights that boost confidence</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        {/* <div className="swiper get-started">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="slide-info">
                                        <div className="started">
                                            <h2 className="title mb-3">Start Your Dating Story</h2>
                                            <p>Your companion for meaningful connections</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="slide-info">
                                        <div className="started">
                                            <h2 className="title mb-3">Begin Your Chapter of Love</h2>
                                            <p>Embrace the dating world armed with tools and support</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="slide-info">
                                        <div className="started">
                                            <h2 className="title mb-3">Your Journey of Connection</h2>
                                            <p>Explore essentials and delights that boost confidence</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-btn">
                                <div className="swiper-pagination style-1 flex-1"></div>
                            </div>
                        </div> */}
                    </div>
                    <div className="bottom-btn container">
                        <button disabled={isSaving} onClick={() => findSomeone()} className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">
                            Find Someone<Loader/>
                        </button>
                        {/* <button disabled={isLoading} onClick={() => navigate('/registration-firstname')} className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Find Someone<Loader/></button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
