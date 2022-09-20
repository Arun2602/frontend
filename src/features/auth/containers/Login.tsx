import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDoLoginMutation } from "~/services/auth";
import { ILoginFormInput } from "~/features/auth/type";
import { FloatingLabelInput } from "~/components/FloatingLabelInput";
import { SocialLogin } from "~/features/auth/components/SocialLogin";
import { LoginType } from "~/config/api/endPoints";
import { encryptPassword } from "~/helpers";

const validationSchema = Yup.object().shape({
	UserName: Yup.string()
		.required("Email is required")
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email address"),
	EncPassword: Yup.string().required("Password is required")
});
const formOptions = { resolver: yupResolver(validationSchema) };

function LoginContainer() {
	const navigate = useNavigate();
	const [doLogin, option] = useDoLoginMutation();

	// get functions to build form with useForm() hook
	const { register, handleSubmit, formState } = useForm<ILoginFormInput>({ ...formOptions, mode: "onChange" });
	const { errors, isDirty, isValid } = formState;

	const onSubmit: SubmitHandler<ILoginFormInput> = async form => {
		const body = {
			UserName: form.UserName,
			EncPassword: encryptPassword(form.EncPassword)
		};
		const resp: any = await doLogin({ body, params: { LoginType: LoginType.basic } });
		if (!resp.error) navigate("/");
	};

	return (
		<div className="animate-opacity flex md:(justify-center max-w-md mx-auto) px-8 flex-col w-full h-full">
			<h1 className="tracking-wide font-bold text-2xl leading-7 mb-2">Log In</h1>
			<p className="tracking-wide text-sm font-normal text-[#00000099] mb-7">
				<Link to="/auth/sso-login" className="text-[#1869B3] underline">
					Log in with your organization
				</Link>
			</p>
			<div className="flex flex-col space-y-3">
				<div>
					<FloatingLabelInput name="Email" register={register("UserName")} />
					{errors.UserName && <span className="text-red-500 text-xs ml-2">{errors.UserName?.message}</span>}
				</div>
				<div>
					<FloatingLabelInput
						type="password"
						name="Password"
						register={register("EncPassword", { required: "Passeord is required" })}
					/>
					{errors.EncPassword && (
						<span className="text-red-500 text-xs ml-2">{errors.EncPassword?.message}</span>
					)}
				</div>
			</div>
			<div className="flex items-center justify-between mt-6">
				<div className="flex items-center select-none">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<label htmlFor="remember-me" className="text-[rgba(0,0,0,0.6)] cursor-pointer ml-2 block text-sm">
						Remember me
					</label>
				</div>

				<Link to="/auth/forgot-password" className="text-sm text-[rgba(0,0,0,0.6)] no-underline">
					Forgot your password?
				</Link>
			</div>
			<button
				disabled={!isDirty || !isValid || option.isLoading}
				onClick={handleSubmit(onSubmit)}
				className="disabled:(opacity-40 cursor-not-allowed) block w-full bg-[#1869B3] tracking-wide py-4 mt-6 rounded-md text-white font-bold mb-2"
			>
				Log In
			</button>

			<SocialLogin isLoginPage />

			<p className="mt-5 tracking-wide text-[#00000099] text-sm pt-1 mb-0 space-x-2">
				<span>Don't have an account?</span>
				<Link to="/auth/signup" className="text-[#1869B3] underline">
					Sign up
				</Link>
			</p>
		</div>
	);
}

export default LoginContainer;
