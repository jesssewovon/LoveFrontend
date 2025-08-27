import { Link, useNavigate } from 'react-router';

import Header from '../components/Header';

export default function Chat() {
  const navigate = useNavigate();
  return (
    <>
      <header class="header header-fixed bg-white">
        <div class="container">
          <div class="header-content">
            <div class="left-content me-3">
              <a onClick={() => navigate(-1)} class="back-btn">
                <i class="icon feather icon-chevron-left"></i>
              </a>
            </div>
            <div class="mid-content d-flex align-items-center text-start">
              <a href="javascript:void(0);" class="media media-40 rounded-circle me-3">
                <img src="../src/assets/images/user/pic1.jpg" alt="/"/>
              </a>
              <div>
                <h6 class="title">Miselia,24</h6>
                <span>Online 24m ago</span>
              </div>  
            </div>
            <div class="right-content d-flex align-items-center">
              <a href="javascript:void(0);" class="dz-icon btn btn-primary light">
                <i class="fa-solid fa-phone"></i>
              </a>
              <a href="javascript:void(0);" class="dz-icon me-0 btn btn-primary light">
                <i class="fa-solid fa-video"></i>
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="page-content space-top p-b60 message-content">
        <div class="container"> 
          <div class="chat-box-area"> 
            <div class="chat-content">
              <div class="message-item">
                <div class="bubble">Hi Richard , thanks for adding me</div>    
                <div class="message-time">08:35</div>    
              </div>
            </div>
            <div class="chat-content user">
              <div class="message-item">
                <div class="bubble">Hi Miselia , your welcome , nice to meet you too</div>    
                <div class="message-time">08:40</div>    
              </div>
            </div>
            <div class="chat-content">
              <div class="message-item">
                <div class="bubble">I look you're singer, can you sing for me</div>    
                <div class="message-time">9:44 AM</div>    
              </div>
            </div>
            <div class="chat-content user">
              <div class="message-item">
                <div class="bubble">Sure</div>    
                <div class="message-time">9.30 AM</div>    
              </div>
            </div>
            <div class="chat-content">
              <div class="message-item">
                <div class="bubble">Really!</div>    
                <div class="message-time">10:44 AM</div>    
              </div>
            </div>
            <div class="chat-content user">
              <div class="message-item">
                <div class="bubble">Why not</div>    
                <div class="message-time">10:44 AM</div>    
              </div>
            </div>
          </div>
        </div> 
      </div>
      <footer class="footer border-top fixed bg-white">
          <div class="container p-2">
              <div class="chat-footer">
                  <form>
                      <div class="form-group">
                          <div class="input-wrapper message-area">
                <div class="append-media"></div>
                              <input type="text" class="form-control" placeholder="Send message..."/>
                              <a href="javascript:void(0);" class="btn-chat">
                                 <i class="icon feather icon-send"></i>
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