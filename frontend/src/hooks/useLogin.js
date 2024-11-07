import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		setLoading(true);
		try {
			const response = await axios.post('http://localhost:5000/api/auth/login', {
				username,
				password
			});

			if (response.data) {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('chat-user', JSON.stringify(response.data.user));
				setAuthUser(response.data.user);
				toast.success('Login successful!');
				navigate('/dashboard');
				return true;
			}
		} catch (error) {
			console.error('Login error:', error);
			toast.error(error.response?.data?.error || 'Login failed');
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;
