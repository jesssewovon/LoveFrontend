import { Link } from 'react-router';

import Header from '../components/Header';

export default function Explore() {
  return (
    <>
      <Header showBackButton={true} title={"Explore"} showWishList={false}/>
      <div class="page-content space-top p-b60">
        <div class="container">
          <div class="row g-3">
            <div class="col-md-6 col-12">
              <div class="dz-media-card style-3">
                <div class="dz-media">
                  <img src="../src/assets/images/explore/pic1.png" alt=""/>
                </div>
                <div class="dz-content">
                  <h3 class="title">Free Tonight</h3>
                  <p>Down for something spontaneous</p>
                  <a href="javascript:void(0);" class="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="dz-media-card style-3">
                <div class="dz-media">
                  <img src="../src/assets/images/explore/pic2.png" alt=""/>
                </div>
                <div class="dz-content">
                  <h3 class="title">Looking for Love</h3>
                  <p>Sweep me off my feet</p>
                  <a href="javascript:void(0);" class="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="dz-media-card style-3">
                <div class="dz-media">
                  <img src="../src/assets/images/explore/pic3.png" alt=""/>
                </div>
                <div class="dz-content">
                  <h3 class="title">Let's be Friends</h3>
                  <p>Maybe even besties</p>
                  <a href="javascript:void(0);" class="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="dz-media-card style-3">
                <div class="dz-media">
                  <img src="../src/assets/images/explore/pic4.png" alt=""/>
                </div>
                <div class="dz-content">
                  <h3 class="title">Coffee Date</h3>
                  <p>Take me to your favorite cafe</p>
                  <a href="javascript:void(0);" class="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="dz-media-card style-3">
                <div class="dz-media">
                  <img src="../src/assets/images/explore/pic5.png" alt=""/>
                </div>
                <div class="dz-content">
                  <h3 class="title">Get Photo Verified</h3>
                  <p>Get Verified</p>
                  <a href="javascript:void(0);" class="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}