import { Outlet } from "react-router-dom";
import { Slider } from "./../components/Slider";
import { useEffect } from "react";

function AuthLayout() {
	useEffect(() => {
		localStorage.clear();
	}, []);
	return (
		<section className="h-full w-full flex">
			<Slider />
			<main className="md:(w-1/2) xl:(w-3/5) w-full animate-opacity flex flex-col h-full overflow-hidden">
				<div className="flex-1 flex flex-col h-full w-full overflow-auto">
					<div className="md:(hidden) w-full mt-10 mb-7">
						<img alt="logo_w" className="px-3 mx-2" src="/assets/images/logo.png" />
					</div>
					<Outlet />
				</div>
				<footer className="flex items-center justify-center space-x-3 text-sm text-gray-400 py-3">
					<a href="https://myigetit.com/about" className="hover:(text-blue-400)">
						About
					</a>
					<a href="https://myigetit.com/privacy" className="hover:(text-blue-400)">
						Privacy
					</a>
					<a href="https://myigetit.com/terms" className="hover:(text-blue-400)">
						Terms
					</a>
				</footer>
			</main>
		</section>
	);
}

export default AuthLayout;
