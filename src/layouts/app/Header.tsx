import { Icon } from "@iconify/react";
import { gapi } from "gapi-script";
import { Link, useNavigate } from "react-router-dom";
import { navigateLink } from "~/config/api/links";

export function AppHeader() {
	const navigate = useNavigate();

	const signOut = () => {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(() => {
			console.log("User signed out.");
			navigate(navigateLink.auth.login, { replace: true });
		});
	};

	return (
		<header className="bg-white">
			<section className="container mx-auto px-4 flex justify-between py-2 w-full">
				<div className="flex items-center">
					<Link to="#!">
						<img className="object-cover" src="/assets/images/logo.png" alt="Store Logo" />
					</Link>
				</div>
				<div className="flex space-x-5">
					<div className="flex items-center space-x-3">
						<span>60 points</span>
						<Icon width={20} icon="ion:help-circle-outline" />
						<Icon width={20} icon="ci:heart-outline" />
						<Icon width={20} icon="clarity:shopping-cart-solid" />
						<Icon
							onClick={() => {
								localStorage.clear();
								navigate("/auth");
							}}
							width={20}
							icon="ant-design:logout-outlined"
						/>
					</div>
					<div className="flex items-center space-x-2">
						<div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-md">
							<span className="font-medium uppercase tracking-wider text-lg text-gray-600">RA</span>
						</div>
						<div className="font-medium leading-5">
							<div>First Name </div>
							<div className="text-sm text-gray-500">Joined in August 2014</div>
						</div>
					</div>
				</div>
			</section>
		</header>
	);
}
