import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardContainer } from "~/features/dashboard";
import AppLayout from "~/layouts/app";
import {
	AuthLayout,
	ForgotPasswordContainer,
	LoginContainer,
	SignUpContainer,
	SsoLoginContainer
} from "~/features/auth";
import ProtectedRoutes from "~/router/ProtectedRoute";
import ResetPasswordContainer from "~/features/account/reset-password/container";
import { LinkedInCallback } from "react-linkedin-login-oauth2";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ProtectedRoutes />}>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<DashboardContainer />} />
						<Route path="*" element="page not found" />
					</Route>
				</Route>
				{/** Public Routes */}
				<Route path="auth" element={<AuthLayout />}>
					<Route index element={<Navigate to="/auth/login" />} />
					<Route path="login" element={<LoginContainer />} />
					<Route path="signup" element={<SignUpContainer />} />
					<Route path="forgot-password" element={<ForgotPasswordContainer />} />
					<Route path="sso-login" element={<SsoLoginContainer />} />
					<Route path="*" element="page not found" />
				</Route>
				<Route path="linkedin" element={<LinkedInCallback />} />
				<Route path="account">
					<Route path="reset-password" element={<ResetPasswordContainer />} />
				</Route>

				<Route path="*" element="page not found" />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
