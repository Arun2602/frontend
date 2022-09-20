import React, { PropsWithChildren } from "react";
import SocialLogin, { Props } from "react-social-login";

class SocialButton extends React.Component {
	render() {
		const { children, triggerLogin, ...props }: any = this.props;
		return (
			<button
				className="inline-flex w-12 h-12 rounded-md items-center justify-center border bg-white border-color[#eee]"
				onClick={triggerLogin}
				{...props}
			>
				{children}
			</button>
		);
	}
}

export default SocialLogin(SocialButton);
