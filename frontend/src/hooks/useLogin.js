import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../utils/axios';

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const login = async (username, password) => {
		try {
			setLoading(true);
			const { data } = await axios.post('/api/auth/login', {
				username,
				password
			});

			localStorage.setItem('chat-user', JSON.stringify(data));
			setAuthUser(data);
			toast.success('Login successful!');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error.response?.data?.error || 'Login failed');
			console.error('Login error:', error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;
