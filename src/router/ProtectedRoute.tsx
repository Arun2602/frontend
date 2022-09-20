import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
	const user = localStorage.getItem('user');
	return {
		auth: !!user,
		role: user ? JSON.parse(user) : null
	};
};

const ProtectedRoute = () => {
	const { auth } = useAuth();
	return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
