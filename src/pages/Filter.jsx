import { Link } from 'react-router';

import Header from '../components/Header';
import { useSelector } from 'react-redux';

export default function EditProfile() {
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);
  return (
    <>
      <Header showBackButton={true} title={"Date filter"} showWishList={false}/>
      <div className="page-content space-top p-b50">
        <div className="container">
          <div className="card style-1">
            <div className="card-header">
              <h6 className="title font-w400 font-14 mb-0">Who you want to date</h6>
            </div>
            <div className="card-body">
              <div className="form-check">
                <label className="form-check-label" htmlFor="filterCheck">Men</label>
                <input className="form-check-input" type="checkbox" id="filterCheck"/>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="filterCheck2">Women</label>
                <input className="form-check-input" type="checkbox" id="filterCheck2" checked="checked"/>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="filterCheck3">Nonbinary people</label>
                <input className="form-check-input" type="checkbox" id="filterCheck3"/>
              </div>	
            </div>
          </div>
          <div className="card style-1">
            <div className="card-header">
              <h6 className="title font-w400 font-14 mb-0">Age</h6>
            </div>
            <div className="card-body">
              <div className="range-slider style-1">
                <div className="mb-3 title font-w600 font-16">
                  <span className="example-val title slider-margin-value-min"></span>
                  <span className="example-val title slider-margin-value-max"></span>
                </div>
                <div id="slider-tooltips"></div>
              </div>
            </div>
          </div>
          <div className="card style-1">
            <div className="card-header">
              <h6 className="title font-w400 font-14 mb-0">Distance</h6>
            </div>
            <div className="card-body">
              <div className="range-slider style-1">
                <div className="mb-3 title font-w600 font-16">
                  <span className="example-val title slider-margin-value-min"></span>
                  <span className="example-val title slider-margin-value-max"></span>
                </div>
                <div id="slider-tooltips2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer fixed">
        <div className="container">
          <a href="home.html" className="btn btn-lg btn-gradient w-100 dz-flex-box btn-shadow rounded-xl">Apply</a>
        </div>
      </div>
    </>
  );
}