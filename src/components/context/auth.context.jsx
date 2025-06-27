import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({});

    const [isAppLoading, setIsAppLoading] = useState(true);

    const [showBeforeTax, setShowBeforeTax] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setUser(null);
        }
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading, showBeforeTax, setShowBeforeTax }}>
            {props.children}
        </AuthContext.Provider>
    )
}
