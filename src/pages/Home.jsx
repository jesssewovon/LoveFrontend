import { useState, useRef, useEffect, useCallback } from "react";
import SwipeDeck from "../components/SwipeDeck";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import api from "../api";
import Header from "../components/Header";
import MenuBar from '../components/MenuBar';
import Loader from "../components/Loader";
import { setIsLoading } from "../store/userSlice";

export default function Home({ savedScroll, onSaveScroll }) {
  const {t} = useTranslation()
  const { isLoading, dateFilter } = useSelector((state) => state.user);
  const [users, setUsers] = useState([
    
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

    // fetch users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get(`home-profiles-load?page=${page}`, {params: dateFilter});
            //const res = await api.get(`https://testnet-backend.piketplace.com/api/v1/index-loading?page=${page}`);
            setUsers(res.data.profiles.data); // adjust to your API structure
            if (res.data.profiles.data.length==0) {
                setPage((p) => 1);
            }
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
                <MenuBar/>
                <div className="page-content space-top p-b65">
                    <div className="container fixed-full-area">
                        <div className="flex items-center justify-center h-screen bg-gray-100">
                            <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    if (users.length==0) {
        return (
            <>
                <Header showBackButton={false} showWishList={true} />
                <MenuBar/>
                <div className="page-content space-top p-b65">
                    <div className="container fixed-full-area">
                        <div className="flex items-center justify-center h-screen bg-gray-100">
                            <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <button onClick={fetchUsers} class="btn btn-gradient w-100 btn-shadow rounded-xl">
                                    {t('reload')}
                                </button>
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
            <MenuBar/>
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
