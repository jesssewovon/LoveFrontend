import { Link } from 'react-router';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

export default function Explore() {
  return (
      <>
          <Header showBackButton={true} title={"Explore"} showWishList={false}/>
          <MenuBar/>
          <div className="page-content space-top p-b65">
              <div className="container fixed-full-area">
                  <div className="flex items-center justify-center h-screen bg-gray-100">
                      <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          COMING SOON
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
  return (
    <>
      <Header showBackButton={true} title={"Explore"} showWishList={false}/>
      <MenuBar/>
      <div className="page-content space-top p-b60">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-6 col-12">
              <div className="dz-media-card style-3">
                <div className="dz-media">
                  <img src="../src/assets/images/explore/pic1.png" alt=""/>
                </div>
                <div className="dz-content">
                  <h3 className="title">Free Tonight</h3>
                  <p>Down for something spontaneous</p>
                  <a href="javascript:void(0);" className="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="dz-media-card style-3">
                <div className="dz-media">
                  <img src="../src/assets/images/explore/pic2.png" alt=""/>
                </div>
                <div className="dz-content">
                  <h3 className="title">Looking for Love</h3>
                  <p>Sweep me off my feet</p>
                  <a href="javascript:void(0);" className="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="dz-media-card style-3">
                <div className="dz-media">
                  <img src="../src/assets/images/explore/pic3.png" alt=""/>
                </div>
                <div className="dz-content">
                  <h3 className="title">Let's be Friends</h3>
                  <p>Maybe even besties</p>
                  <a href="javascript:void(0);" className="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="dz-media-card style-3">
                <div className="dz-media">
                  <img src="../src/assets/images/explore/pic4.png" alt=""/>
                </div>
                <div className="dz-content">
                  <h3 className="title">Coffee Date</h3>
                  <p>Take me to your favorite cafe</p>
                  <a href="javascript:void(0);" className="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="dz-media-card style-3">
                <div className="dz-media">
                  <img src="../src/assets/images/explore/pic5.png" alt=""/>
                </div>
                <div className="dz-content">
                  <h3 className="title">Get Photo Verified</h3>
                  <p>Get Verified</p>
                  <a href="javascript:void(0);" className="btn btn-light rounded-xl">JOIN NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}