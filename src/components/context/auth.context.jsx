import { createContext, useState } from 'react';

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })

    const [isAppLoading, setIsAppLoading] = useState(true);

    const [showBeforeTax, setShowBeforeTax] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading, showBeforeTax, setShowBeforeTax }}>
            {props.children}
        </AuthContext.Provider>
    )
}
