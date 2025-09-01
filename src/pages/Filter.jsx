import { Link } from 'react-router';

import Header from '../components/Header';
import { useSelector } from 'react-redux';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useState } from 'react';

export default function Filter() {
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);

  const [min, setMin] = useState(18)
  const [max, setMax] = useState(82)

  const [value, setValue] = useState(18);

  const onSlide = (render, handle, value, un, percent) => {
    console.log("onSlide", render, handle, value, un, percent)
    //alert('hererrr')
    setMin(value[0].toFixed(0));
    setMax(value[1].toFixed(0));
  };

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
              <div class="mb-3 title font-w600 font-16">
                <span class="example-val title slider-margin-value-min" style={{color: "var(--title)"}}>Between {min} </span>
                <span class="example-val title slider-margin-value-max" style={{color: "var(--title)"}}>and {max}</span>
              </div>
              <div style={{margin: "auto 10px"}}>
                <Nouislider range={{ min: 18, max: 82 }} start={[18, 50]} 
                accessibility
                step={1}
                onSlide={onSlide} connect/>
                {/* {min && max && (
                  <div>
                    Min: {min}, Max: {max} %
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="card style-1">
            <div className="card-header">
              <h6 className="title font-w400 font-14 mb-0">Distance</h6>
            </div>
            <div className="card-body">
              {value && (<div class="mb-3 title font-w600 font-16">
                <span class="example-val title slider-margin-value-min" style={{color: "var(--title)"}}>Up to  {value} kilometers only</span>
              </div>)}
              <div style={{ width: "100%", margin: "15px auto" }}>
                <Nouislider
                  /* start={[value]} */         // ✅ single value
                  start={18}         // ✅ single value
                  range={{ min: 18, max: 100 }}
                  connect={[true, false]} // ✅ fill only before the handle
                  onUpdate={(rendered) => setValue(Math.round(rendered[0]))}
                />
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