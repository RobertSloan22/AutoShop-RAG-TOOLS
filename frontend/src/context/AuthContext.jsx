import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("chat-user"));
		setAuthUser(user);
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
