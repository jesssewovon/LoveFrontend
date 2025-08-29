import { Link } from 'react-router';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

export default function WishList() {
  return (
    <>
      <Header showBackButton={true} title={"WishList"} showWishList={false}/>
      <MenuBar/>
      <div className="page-content space-top p-b65">
        <div className="container">
          <div className="row g-2">
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic1.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Chelsea</h6>  
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic2.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Abby</h6> 
                    <span className="about">Chapman University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic3.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Javelle</h6>  
                    <span className="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic4.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Veronica</h6> 
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic5.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Richard</h6>  
                    <span className="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic6.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Chelsea</h6>  
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic4.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Veronica</h6> 
                    <span className="about">Chapman University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic1.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Richard</h6>  
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic2.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Veronica</h6> 
                    <span className="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="dz-media-card">
                <a href="profile-detail.html">
                  <div className="dz-media">
                    <img src="../src/assets/images/liked/pic5.png" alt=""/>
                  </div>
                  <div className="dz-content">
                    <h6 className="title">Richard</h6>  
                    <span className="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}