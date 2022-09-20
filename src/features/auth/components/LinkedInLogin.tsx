import { Icon } from "@iconify/react";

import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useNavigate } from "react-router-dom";
import { navigateLink } from "~/config/api/links";

const redirect_uri = `${window.location.origin}/linkedin`;

export function LinkedInLogin() {
	const navigate = useNavigate();
	const { linkedInLogin } = useLinkedIn({
		clientId: "86vbqap7bbg5ak",
		redirectUri: redirect_uri,
		state: "test@123",
		onSuccess: code => {
			console.log(code);
			// fetch("https://www.linkedin.com/oauth/v2/accessToken", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/x-www-form-urlencoded"
			// 	},
			// 	body: JSON.stringify({
			// 		grant_type: "client_credentials",
			// 		client_id: "86vbqap7bbg5ak",
			// 		client_secret: "485UFR4WwSpWBWhX"
			// 	})
			// });
			localStorage.setItem("loginType", "linkedin");
			localStorage.setItem("user", JSON.stringify({}));
			navigate(navigateLink.dashboard, { replace: true });
		},
		scope: "r_emailaddress",
		onError: error => {
			console.log(error);
		}
	});
	return (
		<button
			onClick={linkedInLogin}
			className="inline-flex w-12 h-12 rounded-md items-center justify-center border bg-white border-color[#eee]"
		>
			<Icon width={22} icon="akar-icons:linkedin-box-fill" color="#0e76a8" />
		</button>
	);
}
