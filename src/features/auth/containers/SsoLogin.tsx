import { FloatingLabelInput } from "~/components/FloatingLabelInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSsoRequestMutation } from "~/services/auth";
import { toast } from "react-hot-toast";

interface ISsoLoginFormInput {
	domain: string;
}

function SsoLoginContainer() {
	const [ssoRequest, option] = useSsoRequestMutation();
	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid }
	} = useForm<ISsoLoginFormInput>({ mode: "onChange" });

	const onSubmit: SubmitHandler<ISsoLoginFormInput> = data => {
		console.log("login form data", data);
		ssoRequest({ DomainName: data.domain }).then((res: any) => {
			if (res.error) {
				toast.error(res.error.data.Message);
				return;
			}
			// console.log(res.data.Data[0].ssoLoginUrl);
			// console.log(res);
			window.location.href = res.data.Data[0].ssoLoginUrl;
		});
	};

	return (
		<div className="animate-opacity flex md:(justify-center max-w-md mx-auto) flex-col w-full h-full px-8">
			<h1 className="tracking-wide font-bold text-2xl leading-7 mb-2 mt-5">Single Sign On</h1>
			<p className="tracking-wide text-sm font-normal text-[#00000099] mb-7">
				If your company has single sign-on set-up with i GET IT, enter your company's web address to access your
				unique login page. The format needs to be as such: "domainname.com".
			</p>
			<FloatingLabelInput register={register("domain", { required: true })} />
			<button
				disabled={!isDirty || !isValid || option.isLoading}
				onClick={handleSubmit(onSubmit)}
				className="disabled:(opacity-40 cursor-not-allowed) block w-full bg-[#1869B3] py-4 font-bold mt-4 rounded-md text-white mb-2"
			>
				{!option.isLoading ? "Proceed" : "Signing..."}
			</button>
			<Link
				to="/auth"
				className="no-underline flex space-x-1 tracking-wide text-sm font-normal text-[#00000099] mt-7"
			>
				<span>Not an enterprise user?</span>
				<span className="text-[#1869B3] underline cursor-pointer">Login</span>
			</Link>
		</div>
	);
}

export default SsoLoginContainer;
