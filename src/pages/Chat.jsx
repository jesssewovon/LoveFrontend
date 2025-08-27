import { Link, useNavigate } from 'react-router';

import Header from '../components/Header';

export default function Chat() {
  const navigate = useNavigate();
  return (
    <>
      <header className="header header-fixed bg-white">
        <div className="container">
          <div className="header-content">
            <div className="left-content me-3">
              <a onClick={() => navigate(-1)} className="back-btn">
                <i className="icon feather icon-chevron-left"></i>
              </a>
            </div>
            <div className="mid-content d-flex align-items-center text-start">
              <a href="javascript:void(0);" className="media media-40 rounded-circle me-3">
                <img src="../src/assets/images/user/pic1.jpg" alt="/"/>
              </a>
              <div>
                <h6 className="title">Miselia,24</h6>
                <span>Online 24m ago</span>
              </div>  
            </div>
            <div className="right-content d-flex align-items-center">
              <a href="javascript:void(0);" className="dz-icon btn btn-primary light">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="javascript:void(0);" className="dz-icon me-0 btn btn-primary light">
                <i className="fa-solid fa-video"></i>
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="page-content space-top p-b60 message-content">
        <div className="container"> 
          <div className="chat-box-area"> 
            <div className="chat-content">
              <div className="message-item">
                <div className="bubble">Hi Richard , thanks for adding me</div>    
                <div className="message-time">08:35</div>    
              </div>
            </div>
            <div className="chat-content user">
              <div className="message-item">
                <div className="bubble">Hi Miselia , your welcome , nice to meet you too</div>    
                <div className="message-time">08:40</div>    
              </div>
            </div>
            <div className="chat-content">
              <div className="message-item">
                <div className="bubble">I look you're singer, can you sing for me</div>    
                <div className="message-time">9:44 AM</div>    
              </div>
            </div>
            <div className="chat-content user">
              <div className="message-item">
                <div className="bubble">Sure</div>    
                <div className="message-time">9.30 AM</div>    
              </div>
            </div>
            <div className="chat-content">
              <div className="message-item">
                <div className="bubble">Really!</div>    
                <div className="message-time">10:44 AM</div>    
              </div>
            </div>
            <div className="chat-content user">
              <div className="message-item">
                <div className="bubble">Why not</div>    
                <div className="message-time">10:44 AM</div>    
              </div>
            </div>
          </div>
        </div> 
      </div>
      <footer className="footer border-top fixed bg-white">
          <div className="container p-2">
              <div className="chat-footer">
                  <form>
                      <div className="form-group">
                          <div className="input-wrapper message-area">
                <div className="append-media"></div>
                              <input type="text" className="form-control" placeholder="Send message..."/>
                              <a href="javascript:void(0);" className="btn-chat">
                                 <i className="icon feather icon-send"></i>
                              </a>
                          </div>
                      </div>
                  </form>
              </div>    
          </div>
      </footer>
    </>
  );
}