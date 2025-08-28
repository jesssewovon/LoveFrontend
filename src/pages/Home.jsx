import { useState, useRef, useEffect, useCallback } from "react";
import SwipeDeck from "../components/SwipeDeck";
import { useSelector } from "react-redux";

import api from "../api";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { setIsLoading } from "../varsSlice";

export default function Home({ savedScroll, onSaveScroll }) {
  const { isLoading } = useSelector((state) => state.vars);
  const [users, setUsers] = useState([
    
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch API data
    const fetchData = useCallback(async () => {
      try {
        setLoading(true);
        const res = await api.get(`index-loading?page=${page}`);
        setUsers((prev) => [...prev, ...res.data.products.data]);
      } catch (err) {
        alert('error')
        console.error(err);
      } finally {
        console.log('users', users)
        alert('finally')
        setLoading(false);
      }
    }, [page]);

    // fetch users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
        const res = await api.get(`index-loading?page=${page}`);
        setUsers(res.data.products.data); // adjust to your API structure
        } catch (err) {
        console.error("Error fetching users:", err);
        }
        console.log('users', users)
        setLoading(false);
    };
  
    // Load data on page change
    useEffect(() => {
      fetchUsers();
    }, [page]);

    const handleSwipe = (dir, user, nb) => {
        console.log("Swiped", dir, user);
        //if (dir === "right") api.post(`/like/${user.id}`);
        //if (dir === "left") api.post(`/dislike/${user.id}`);
        //if (dir === "up") api.post(`/superlike/${user.id}`);

        // 🔄 when deck gets empty, fetch next page
        if (nb === 1) {
            setPage((p) => p + 1);
        }
    };
    if (loading) {
        return (
            <>
                <Header showBackButton={false} showWishList={true} />
                <div className="page-content space-top p-b65">
                    <div className="container fixed-full-area">
                        <div className="flex items-center justify-center h-screen bg-gray-100">
                            <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="50" height="50" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
        <Header showBackButton={false} showWishList={true} />
            <div className="page-content space-top p-b65">
                <div className="container fixed-full-area">
                    <div className="flex items-center justify-center h-screen bg-gray-100">
                        <SwipeDeck key={JSON.stringify(users)} users={users} onSwipe={handleSwipe} />
                    </div>
                </div>
            </div>
        </>
    );
}
