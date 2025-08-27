import { Link } from 'react-router';

import Header from '../components/Header';

export default function WishList() {
  return (
    <>
      <Header showBackButton={true} title={"WishList"} showWishList={false}/>
      <div class="page-content space-top p-b65">
        <div class="container">
          <div class="row g-2">
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic1.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Chelsea</h6>  
                    <span class="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic2.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Abby</h6> 
                    <span class="about">Chapman University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic3.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Javelle</h6>  
                    <span class="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic4.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Veronica</h6> 
                    <span class="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic5.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Richard</h6>  
                    <span class="about">Law student at stanford</span>  
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic6.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Chelsea</h6>  
                    <span class="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic4.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Veronica</h6> 
                    <span class="about">Chapman University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic1.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Richard</h6>  
                    <span class="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic2.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Veronica</h6> 
                    <span class="about">Harward University</span> 
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6">
              <div class="dz-media-card">
                <a href="profile-detail.html">
                  <div class="dz-media">
                    <img src="../src/assets/images/liked/pic5.png" alt=""/>
                  </div>
                  <div class="dz-content">
                    <h6 class="title">Richard</h6>  
                    <span class="about">Law student at stanford</span>  
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