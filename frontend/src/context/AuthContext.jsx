import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	// Check authentication status on mount
	useEffect(() => {
		const checkAuth = () => {
			const storedUser = localStorage.getItem('chat-user');
			if (storedUser) {
				const user = JSON.parse(storedUser);
				// Optional: Check if token is expired
				setAuthUser(user);
			} else {
				setAuthUser(null);
				navigate('/login');
			}
			setLoading(false);
		};

		checkAuth();
	}, [navigate]);

	// Update localStorage when authUser changes
	useEffect(() => {
		if (authUser) {
			localStorage.setItem('chat-user', JSON.stringify(authUser));
		} else {
			localStorage.removeItem('chat-user');
		}
	}, [authUser]);

	if (loading) {
		return <div>Loading...</div>; // Or your loading component
	}

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
