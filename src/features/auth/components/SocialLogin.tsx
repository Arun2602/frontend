import { Icon } from "@iconify/react";
import { LinkedInLogin } from "./LinkedInLogin";
import SocialButton from "./FBLogin";
import { navigateLink } from "~/config/api/links";
import { useNavigate } from "react-router-dom";
import { useDoSocialSignUpMutation } from "~/services/auth";
import { toast } from "react-hot-toast";
import { dispatch } from "~/config/store";
import { login } from "../state/authSlice";
import { GoogleLogin } from "~/features/auth/components/GoogleLogin";

export function SocialLogin({ isLoginPage }: { isLoginPage?: boolean }) {
	const navigate = useNavigate();
	const [doSignup, option] = useDoSocialSignUpMutation();

	const onLoginSuccess = async ({ profile, provider }: any) => {
		const SocialType: any = {
			facebook: "FacebookID",
			google: "GoogleID"
		};
		console.log(profile);
		const user = {
			FirstName: profile.firstName,
			LastName: profile.lastName,
			Email: profile.email,
			SocialID: profile.id,
			SocialType: SocialType[provider]
		};

		const resp: any = await doSignup(user);

		if (resp.data.Status === "F") {
			toast.error(resp.data.Message);
			return;
		} else {
			dispatch(login);
			localStorage.setItem("loginType", provider);
			localStorage.setItem("user", JSON.stringify(resp.data.Data));

			navigate(navigateLink.dashboard, { replace: true });
		}
	};
	return (
		<section className="flex-col mt-10 space-y-5">
			<div className="relative">
				<hr className="h-1 w-full" />
				<span className="text-sm font-semibold absolute -top-3 bg-[#fafafa] text-[#646464] pr-2">
					You can also continue with
				</span>
			</div>
			<div className="flex space-x-3">
				<SocialButton
					appId={import.meta.env.VITE_G_CLIENT_ID}
					provider="google"
					onLoginSuccess={onLoginSuccess}
					onLoginFailure={res => console.log("onLoginFailure", res)}
				>
					<Icon width={22} icon="flat-color-icons:google" />
				</SocialButton>

				<GoogleLogin />
				<LinkedInLogin />

				<SocialButton
					appId={import.meta.env.VITE_FB_APP_ID}
					onLoginSuccess={onLoginSuccess}
					onLoginFailure={res => console.log("onLoginFailure", res)}
					provider="facebook"
				>
					<Icon width={22} icon="akar-icons:facebook-fill" color="#3b5998" />
				</SocialButton>
			</div>
		</section>
	);
}
