// hooks/useAuth.js
import { useState, useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem("isLoggedIn");
        if (isUserLoggedIn === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    return isLoggedIn;
};

export default useAuth;
