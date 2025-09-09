import { Link } from 'react-router';

import Header from '../components/Header';
import { useSelector } from 'react-redux';

export default function EditProfile() {
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);
  const profileForm = useSelector((state) => state.profileForm);
  console.log('profileForm', profileForm)
  return (
    <>
      <Header showBackButton={true} title={"Edit profile"} showWishList={false}/>
      <div className="page-content space-top">
        <div className="container"> 
          <div className="row g-3 mb-3" data-masonry='{"percentPosition": true }'>
            <div className="col-8">
              <div className="dz-drop-box style-2">
                <div className="drop-bx bx-lg">
                  <div className="imagePreview" style={{backgroundImage: `url(${user.profile.imageFirst})`}}>
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
                  <div className="dz-drop-box style-2">
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
                  <div className="dz-drop-box style-2">
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
          </div>
          
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">intrests</h6>
            </div>
            <div className="card-body">
              <a href="javascript:void(0);" className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom1" aria-controls="offcanvasBottom3">
                <span>Photography, Tea, Travel</span>
              </a>
            </div>
          </div>
          
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Relationship goals</h6>
            </div>
            <div className="card-body">
              <a href="javascript:void(0);" className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom3">
                <span>Long-term partner</span>
                <i className="icon feather dz-flex-box icon-chevron-right ms-auto me-0"></i>
              </a>
            </div>
          </div>
          
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">language I know</h6>
            </div>
            <div className="card-body">
              <a href="javascript:void(0);" className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLang" aria-controls="offcanvasLang">
                <span className="select-lang">English</span>
              </a>
            </div>
          </div>
          
          <div className="card style-3">
            <div className="card-header">
              <h6 className="title mb-0 font-14 font-w500">Sexual Orientation</h6>
            </div>
            <div className="card-body">
              <a href="javascript:void(0);" className="setting-input" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom3" aria-controls="offcanvasBottom3">
                <span>Staright</span>
                <i className="icon feather dz-flex-box icon-chevron-right ms-auto me-0"></i>
              </a>
            </div>
          </div>
        </div> 
      </div>
      
        <div className="offcanvas offcanvas-bottom intrests" tabIndex="-1" id="offcanvasBottom1">
          <div className="offcanvas-header share-style">
            <h6 className="title mb-0">Interest</h6>
            <button type="button" className="btn-close dz-flex-box" data-bs-dismiss="offcanvas" aria-label="Close">
              <i className="icon feather icon-x font-22"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="input-group input-group-icon search-input">
              <div className="input-group-text">
                <div className="input-icon">
                  <i className="icon feather icon-search"></i>
                </div>
              </div>
              <input type="search" className="form-control ms-0" placeholder="Search..."/>
            </div>
            <ul className="dz-tag-list style-2">
              <li> 
                <div className="dz-tag">
                  <span>Ludo</span>
                </div>
              </li>
              {profileForm.interests?.map(({ name }, index) => {
                  return (
                      <li key={index}> 
                        <div className="dz-tag">
                          <span>{name}</span>
                        </div>
                      </li>
                  );
              })}
            </ul>
          </div>
        </div>
      
        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom2">
          <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <div className="offcanvas-header share-style m-0 pb-0">
            <h6 className="title">Relationship Goals</h6>
          </div>
          <div className="offcanvas-body">
            <div className="radio style-2">
              <label className="radio-label">
                <input type="radio" checked="checked" name="radio2"/>
                <span className="checkmark">						
                  <span className="text">Long-term partner</span>
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio2"/>
                <span className="checkmark">
                  <span className="text">Long-term, open to short</span>
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio2"/>
                <span className="checkmark">
                  <span className="text">Short-term, open to long</span>	
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio2"/>
                <span className="checkmark">
                  <span className="text">Short-term fun</span>	
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio2"/>
                <span className="checkmark">
                  <span className="text">New friends</span>	
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio2"/>
                <span className="checkmark">
                  <span className="text">Stil figuring it out</span>	
                  <span className="check"></span>							
                </span>
              </label>
            </div>
          </div>
        </div>
      
        <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasLang">
          <div className="offcanvas-header share-style">
            <h6 className="title mb-0">Language</h6>
            <button type="button" className="btn-close dz-flex-box" data-bs-dismiss="offcanvas" aria-label="Close">
              <i className="icon feather icon-x font-22"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="dz-list">
              <ul className="mb-2 confirm-lang">
                <li data-lang="indian">
                  <a href="javascript:void(0);" className="item-content py-2 item-link">
                    <div className="media media-30 me-3">
                      <img src="../assets/images/flags/india.svg" alt="/"/>
                    </div>
                    <div className="dz-inner">
                      <span className="title">Indian</span>
                    </div>
                  </a>
                </li>
                <li data-lang="English">
                  <a href="javascript:void(0);" className="item-content py-2 item-link">
                    <div className="media media-30 me-3">
                      <img src="../assets/images/flags/united-states.svg" alt="/"/>
                    </div>
                    <div className="dz-inner">
                      <span className="title">English</span>
                    </div>
                  </a>
                </li>
                <li data-lang="German">
                  <a href="javascript:void(0);" className="item-content py-2 item-link">
                    <div className="media media-30 me-3">
                      <img src="../assets/images/flags/germany.svg" alt="/"/>
                    </div>
                    <div className="dz-inner">
                      <span className="title">German</span>
                    </div>
                  </a>
                </li>
                <li data-lang="Italian">
                  <a href="javascript:void(0);" className="item-content py-2 item-link">
                    <div className="media media-30 me-3">
                      <img src="../assets/images/flags/italy.svg" alt="/"/>
                    </div>
                    <div className="dz-inner">
                      <span className="title">Italian</span>
                    </div>
                  </a>
                </li>	
                <li className="border-0" data-lang="Spainsh">
                  <a href="javascript:void(0);" className="item-content py-2 item-link">
                    <div className="media media-30 me-3">
                      <img src="../assets/images/flags/spain.svg" alt="/"/>
                    </div>
                    <div className="dz-inner">
                      <span className="title">Spainsh</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      
        <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom3">
          <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <div className="offcanvas-header share-style m-0 pb-0">
            <h6 className="title">Sexual Orientation</h6>
          </div>
          <div className="offcanvas-body">
            <div className="radio style-2">
              <label className="radio-label">
                <input type="radio" checked="checked" name="radio3"/>
                <span className="checkmark">						
                  <span className="text">Straight</span>
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio3"/>
                <span className="checkmark">
                  <span className="text">gay</span>
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio3"/>
                <span className="checkmark">
                  <span className="text">Lesbian</span>	
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio3"/>
                <span className="checkmark">
                  <span className="text">Bisexual</span>	
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio3"/>
                <span className="checkmark">
                  <span className="text">Asexual</span>	
                  <span className="check"></span>							
                </span>
              </label>
              <label className="radio-label">
                <input type="radio" name="radio3"/>
                <span className="checkmark">
                  <span className="text">Queer</span>	
                  <span className="check"></span>							
                </span>
              </label>
            </div>
          </div>
        </div>
    </>
  );
}