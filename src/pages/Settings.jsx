import { Link } from 'react-router';

import Header from '../components/Header';
import { useSelector } from 'react-redux';

export default function EditProfile() {
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);
  return (
    <>
      <Header showBackButton={true} title={"Settings"} showWishList={false}/>
      <div className="page-content space-top">
        <div className="container">
          <h6 className="title">Discovery Setting</h6>
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Location</h6>
            </div>
            <div className="card-body">
              <a href="javascript:void(0);" className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom3" aria-controls="offcanvasBottom">
                <i className="icon dz-flex-box feather icon-map-pin"></i>
                <span>2300 Traverwood Dr.Ann Arbor, MI..</span>
              </a>
            </div>
          </div>
          <h6 className="title">Other</h6>
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Maximum Distance</h6>
              <div className="title font-w600 font-16">
                <span className="example-val title slider-margin-value-min"></span>
                <span className="example-val title slider-margin-value-max"></span>
              </div>
            </div>
            <div className="card-body py-4">
              <div className="range-slider style-1 w-100">
                <div id="slider-tooltips3"></div>
              </div>
            </div>
          </div>
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Show Me</h6>
            </div>
            <div className="card-body">
              <a href="javascript:void(0);" className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom4" aria-controls="offcanvasBottom">
                <span>Women</span>
                <i className="icon feather dz-flex-box icon-chevron-right ms-auto me-0"></i>
              </a>
            </div>
          </div>
          <div className="card style-3 mb-0">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Age Range</h6>
              <div className="title font-w600 font-16">
                <span className="example-val title slider-margin-value-min"></span>
                <span className="example-val title slider-margin-value-max"></span>
              </div>
            </div>
            <div className="card-body py-4">
              <div className="range-slider style-1 w-100">
                <div id="slider-tooltips4"></div>
              </div>
            </div>
          </div>
        </div> 
      </div>
  
      <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom1">
        <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="offcanvas-header share-style m-0 pb-0">
          <h6 className="title">Phone Number</h6>
        </div>
        <div className="offcanvas-body overflow-visible">
          <form>
            <div className="input-group dz-select">
              <div className="input-group-text"> 
                <div>
                  <select className="form-control custom-image-select image-select">
                    <option data-thumbnail="../assets/images/flags/australia.png">+61</option>
                    <option data-thumbnail="../assets/images/flags/india.png">+91</option>
                    <option data-thumbnail="../assets/images/flags/uae.png">+971</option>
                    <option data-thumbnail="../assets/images/flags/us.png">+1</option>
                  </select>
                </div>
              </div>
              <input type="number" className="form-control" value="1234567890"/>
            </div>
            <a href="javascript:void(0);" className="btn btn-gradient w-100 dz-flex-box btn-shadow rounded-xl" data-bs-dismiss="offcanvas" aria-label="Close">Save</a>
          </form>		
        </div>
      </div>
      <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom2">
        <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="offcanvas-header share-style m-0 pb-0">
          <h6 className="title">Email Address</h6>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="input-group input-group-icon">
              <div className="input-group-text">
                <div className="input-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
              </div>
              <input type="email" className="form-control" value="yourname@gmail"/>
            </div>
            <a href="javascript:void(0);" className="btn btn-gradient w-100 dz-flex-box btn-shadow rounded-xl" data-bs-dismiss="offcanvas" aria-label="Close">Save</a>
          </form>
        </div>
      </div>
    
      <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom3">
        <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="offcanvas-header share-style m-0 pb-0">
          <h6 className="title">Email Address</h6>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="input-group input-group-icon">
              <div className="input-group-text">
                <div className="input-icon">
                  <i className="icon feather icon-map-pin"></i>
                </div>
              </div>
              <input type="email" className="form-control" value="2300 Traverwood Dr.Ann Arbor, MI 48105 United States"/>
            </div>
            <a href="javascript:void(0);" className="btn btn-gradient w-100 dz-flex-box btn-shadow rounded-xl" data-bs-dismiss="offcanvas" aria-label="Close">Save</a>
          </form>
        </div>
      </div>
    
      <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom4">
        <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="offcanvas-header share-style m-0 pb-0">
          <h6 className="title">Show Me</h6>
        </div>
        <div className="offcanvas-body">
          <div className="radio style-2">
            <label className="radio-label">
              <input type="radio" checked="checked" name="radio2"/>
              <span className="checkmark">						
                <span className="text">Women</span>
                <span className="check"></span>							
              </span>
            </label>
            <label className="radio-label">
              <input type="radio" name="radio2"/>
              <span className="checkmark">
                <span className="text">Men</span>
                <span className="check"></span>							
              </span>
            </label>
            <label className="radio-label">
              <input type="radio" name="radio2"/>
              <span className="checkmark">
                <span className="text">Other</span>	
                <span className="check"></span>							
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}