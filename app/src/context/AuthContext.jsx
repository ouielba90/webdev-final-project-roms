import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, [token]);

    const login = (newToken, newUsername) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
        setToken(newToken);
        setUsername(newUsername);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, username, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
