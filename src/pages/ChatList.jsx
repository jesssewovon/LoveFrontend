import { Link } from 'react-router';

import Header from '../components/Header';

export default function ChatList() {
  return (
    <>
      <Header showBackButton={true} title={"New Matches"} showWishList={false}/>
      <div className="page-content space-top p-b60">
        <div className="container">
          <div className="swiper chat-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">                
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic1.jpg" alt=""/>
                  </div>
                  <span>Grayson</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent"> 
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic2.jpg" alt=""/>
                  </div>
                  <span>Tenzing</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">  
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic3.jpg" alt=""/>
                  </div>
                  <span>Elisha</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">  
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic4.jpg" alt=""/>
                  </div>
                  <span>Mitchell</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">  
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic5.jpg" alt=""/>
                  </div>
                  <span>Stephon</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent"> 
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic4.jpg" alt=""/>
                  </div>
                  <span>Mitchell</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent"> 
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic5.jpg" alt=""/>
                  </div>
                  <span>Stephon</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="title-bar">
            <h6 className="title">Message</h6>
          </div>
          <ul className="message-list">
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic1.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Leneve</h6>
                    <p className="last-msg">Would love to!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">2m ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="active">
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic2.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Matt</h6>
                    <p className="last-msg">Is that because we like the...</p>
                  </div>
                  <div className="right-content">
                    <span className="date">4m ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic3.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Karthik</h6>
                    <p className="last-msg">How do you know john?</p>
                  </div>
                  <div className="right-content">
                    <span className="date">8h ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="active">
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic4.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Elisha</h6>
                    <p className="last-msg">Have you even been...</p>
                  </div>
                  <div className="right-content">
                    <span className="date">1d ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic5.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Wyatt</h6>
                    <p className="last-msg">that so awesome!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">3h ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic6.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Leneve</h6>
                    <p className="last-msg">Is that because we like the...</p>
                  </div>
                  <div className="right-content">
                    <span className="date">5d ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="active">
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic7.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Matt</h6>
                    <p className="last-msg">Would love to!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">2m ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic8.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Wyatt</h6>
                    <p className="last-msg">Would love to!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">4m ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>    
      </div>
    </>
  );
}