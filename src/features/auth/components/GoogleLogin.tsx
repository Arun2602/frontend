import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { useNavigate } from "react-router";
import { navigateLink } from "~/config/api/links";
import { useDoLoginMutation } from "~/services/auth";
import { LoginType } from "~/config/api/endPoints";

export const gAuth2 = async () => await loadAuth2(gapi, import.meta.env.VITE_G_CLIENT_ID, "");

type GoogleType = {
	isLoginPage?: boolean;
};
export const GoogleLogin = (props: GoogleType) => {
	const { isLoginPage } = props;
	const [user, setUser] = useState<any>(null);
	const [doLogin] = useDoLoginMutation();
	const navigate = useNavigate();

	useEffect(() => {
		const setAuth2 = async () => {
			const auth2 = await gAuth2();
			if (auth2.isSignedIn.get()) {
				console.log(auth2.currentUser.get());
				updateUser(auth2.currentUser.get());
			} else {
				const loginBtnElement = document.getElementById("gLogin") as HTMLButtonElement;
				attachSignin(loginBtnElement, auth2);
			}
		};
		setAuth2();
	}, []);

	const updateUser = async (currentUser: any) => {
		const name = currentUser.getBasicProfile().getName();
		const profileImg = currentUser.getBasicProfile().getImageUrl();
		console.log({
			name,
			profileImg,
			familyName: currentUser.getBasicProfile().getFamilyName(),
			email: currentUser.getBasicProfile().getEmail()
		});
		setUser({ name, profileImg });
		localStorage.setItem("loginType", "google");
		localStorage.setItem("user", JSON.stringify(user));
		navigate(navigateLink.dashboard, { replace: true });
	};

	const attachSignin = (element: HTMLButtonElement, auth2: any) => {
		auth2.attachClickHandler(element, {}, successResponse, errorHandling);
	};

	const successResponse = (googleUser: any) => {
		updateUser(googleUser);
	};
	const errorHandling = (error: any) => {
		console.log(JSON.stringify(error));
	};

	return (
		<button
			id="gLogin"
			className="hidden inline-flex w-12 h-12 rounded-md items-center justify-center border bg-white border-color[#eee]"
		>
			<Icon width={22} icon="flat-color-icons:google" />
		</button>
	);
};
