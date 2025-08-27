import { useState, useRef, useEffect, useCallback } from "react";
import SwipeDeck from "../components/SwipeDeck";

import api from "../api";
import Header from "../components/Header";

export default function Home({ savedScroll, onSaveScroll }) {
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
    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
        const res = await api.get(`index-loading?page=${page}`);
        setUsers((prev) => [...prev, ...res.data.products.data]); // adjust to your API structure
        } catch (err) {
        console.error("Error fetching users:", err);
        }
        console.log('users', users)
        setLoading(false);
    };

    const fetchData__ = async () => {
        setLoading(true);
        const res = await api.get(`index-loading?page=${page}`)
        .then((res) => setUsers((prev) => [...prev, ...res.data.products.data]))
        .catch((err) => console.error(err));
        setLoading(false);
    };
  
    // Load data on page change
    useEffect(() => {
      fetchData__();
    }, [page]);

    const handleSwipe = (direction, user) => {
        if (direction === "up") {
        console.log(`Super liked 💙 ${user.name}`);
        } else {
        console.log(`Swiped ${direction} on ${user.name}`);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <SwipeDeck key={JSON.stringify(users)} users={users} onSwipe={handleSwipe} />
        </div>
    );
}
