import { Link } from 'react-router';

import SwipeCard from "../components/SwipeCard";

import { useState, useRef } from "react";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useActivate, useUnactivate } from "react-activation";

import api from "../api"

import Header from '../components/Header';

export default function Home({ savedScroll, onSaveScroll }) {
  useActivate(() => {
    //alert('activated')
    // restore scroll when component mounts
    //alert('savedScroll: '+savedScroll)
    window.scrollTo(0, savedScroll || 0);
    return () => {
      //console.log('onSaveScroll')
      // save scroll before unmount
      onSaveScroll(window.scrollY);
    };
    console.log("PageA re-activated");
  });

  const handleSwipe = (direction, tt) => {
    console.log("Swiped:", direction, tt);
  };

  const vars = useSelector((state) => state.vars);
  //alert(vars.isLoggedIn)
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Fetch API data
  const fetchData = async () => {
    setLoading(true);
    const res = await api.get(`index-loading?page=${page}`)
      .then((res) => setItems((prev) => [...prev, ...res.data.products.data]))
      .catch((err) => console.error(err));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Intersection Observer to detect scroll end
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  return (
    <>
        <Header showBackButton={false} showWishList={true}/>
        <div className="page-content space-top p-b65">
    			Home
    		</div>
    </>
  );
}