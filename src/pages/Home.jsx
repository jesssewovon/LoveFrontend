import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useActivate } from "react-activation";

import api from "../api";
import Header from "../components/Header";
import SwipeCard from "../components/SwipeCard";

export default function Home({ savedScroll, onSaveScroll }) {
  const vars = useSelector((state) => state.vars);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Restore scroll on activation
  useActivate(() => {
    window.scrollTo(0, savedScroll || 0);
    return () => onSaveScroll(window.scrollY);
  });

  // Memoized swipe handler to avoid re-renders
  const handleSwipe = useCallback((direction, tt) => {
    console.log("Swiped:", direction, tt);
  }, []);

  // Fetch API data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`index-loading?page=${page}`);
      setItems((prev) => [...prev, ...res.data.products.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Load data on page change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <Header showBackButton={false} showWishList={true} />
      <div className="page-content space-top p-b65">
        <div className="container fixed-full-area">
          <div className="dzSwipe_card-cont dz-gallery-slider">
            {items.map((item) => (
              <SwipeCard key={item.id} user={item} onSwipe={handleSwipe} />
            ))}
            <div ref={loaderRef} className="h-4" /> {/* sentinel for infinite scroll */}
          </div>
        </div>
      </div>
    </>
  );
}
