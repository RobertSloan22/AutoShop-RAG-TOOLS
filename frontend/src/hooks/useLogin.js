import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const login = async (username, password) => {
		try {
			setLoading(true);
			const res = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || 'Login failed');
			}

			localStorage.setItem('chat-user', JSON.stringify(data));
			setAuthUser(data);
			toast.success('Login successful!');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error.message);
			console.error('Login error:', error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;
