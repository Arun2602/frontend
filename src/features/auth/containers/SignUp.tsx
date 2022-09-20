import * as Yup from "yup";
import React from "react";
import { Icon } from "@iconify/react";
import { FloatingLabelInput } from "~/components/FloatingLabelInput";
import { SocialLogin } from "~/features/auth/components/SocialLogin";
import { OtpModal } from "~/features/auth/components/OtpModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { encryptPassword } from "~/helpers";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDoSignUpMutation, useSendVerifyEmailMutation } from "~/services/auth";

interface ISingUpFormInput {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
	CPassword: string;
	MarketingEmail: boolean;
	optVerified?: boolean;
}

const validationSchema = Yup.object().shape({
	FirstName: Yup.string().required("First Name is required"),
	LastName: Yup.string().required("Last Name is required"),
	Email: Yup.string()
		.required("Email is required")
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email address"),
	Password: Yup.string()
		.required("password is required")
		.matches(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{12,}$/,
			"Use 12 or more characters with a mix of letters, numbers & symbols"
		),
	CPassword: Yup.string()
		.required("Confirm Password is required")
		.matches(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{12,}$/,
			"Use 12 or more characters with a mix of letters, numbers & symbols"
		)
		.oneOf([Yup.ref("Password"), null], "Password must match"),
	MarketingEmail: Yup.boolean(),
	optVerified: Yup.boolean().required("Email not verified")
});

function SignUpContainer() {
	const [isVerified, setIsVerified] = React.useState<boolean>(false);
	const [tempEmail, setTempEmail] = React.useState<string | undefined>(undefined);
	const [doSignup, option] = useDoSignUpMutation();
	const [verifyEmail, verifyEmailOption] = useSendVerifyEmailMutation();

	const navigate = useNavigate();
	const { register, handleSubmit, setValue, getValues, watch, formState } = useForm<ISingUpFormInput>({
		resolver: yupResolver(validationSchema),
		mode: "onChange"
	});
	const watchEmail = watch("Email");
	const { errors, isDirty, isValid } = formState;

	const onSubmit: SubmitHandler<ISingUpFormInput> = async form => {
		delete form.optVerified;
		const MarketingEmail = form.MarketingEmail ? "Yes" : "No";
		const userFormInputs = {
			FirstName: form.FirstName,
			LastName: form.LastName,
			Email: form.Email,
			Password: encryptPassword(form.CPassword),
			MarketingEmail,
			PreferredSoftwareID: 0,
			FavouriteSoftware: 0,
			EmailPref: 0
		};
		const resp: any = await doSignup(userFormInputs);
		if (!resp.error) navigate("/auth");
	};

	const handleOtp = (otp: string | undefined) => {
		if (otp) setValue("optVerified", true, { shouldValidate: true });
		setIsVerified(false);
	};

	React.useEffect(() => {
		register("optVerified", { required: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		console.log(tempEmail === watchEmail);
		setValue("optVerified", tempEmail === watchEmail, { shouldValidate: true });
	}, [watchEmail]);

	const handleVerifyEmail = () => {
		const { Email } = getValues();
		if (!Email) {
			toast.error("Invalid Email Address");
			return;
		}
		setTempEmail(Email);
		verifyEmail({ Email }).then((resp: any) => {
			if (resp.data) {
				setIsVerified(true);
				toast.success(resp.data.Message);
			}
		});
	};
	return (
		<>
			<section className="animate-opacity flex md:(justify-center max-w-md mx-auto) px-8 flex-col px-4 w-full h-full">
				<h1 className="tracking-wide font-bold text-2xl leading-7 mb-2">Sign Up</h1>
				<p className="tracking-wide text-sm font-normal text-[rgba(0,0,0,0.6)] mb-7">
					<span>Already have a account? </span>
					<Link to="/auth" className="text-[#1869B3] underline">
						Log in
					</Link>
				</p>
				<div className="flex flex-col space-y-5">
					<div className="flex space-x-5">
						<div className="w-full">
							<FloatingLabelInput register={register("FirstName")} />
							{errors.FirstName && (
								<span className="text-red-500 text-xs ml-2">{errors.FirstName?.message}</span>
							)}
						</div>
						<div className="w-full">
							<FloatingLabelInput register={register("LastName")} />
							{errors.LastName && (
								<span className="text-red-500 text-xs ml-2">{errors.LastName?.message}</span>
							)}
						</div>
					</div>
					<div className="relative">
						<FloatingLabelInput
							register={register("Email")}
							isVerify={!!getValues("Email") && !errors.Email}
							handleVerify={() => {
								handleVerifyEmail();
							}}
						/>
						{verifyEmailOption.isLoading && (
							<span className="bg-white inline-flex w-24 h-10 items-center justify-end absolute top-1 right-3">
								<Icon width={22} icon="tabler:loader-2" color="#666" className="animate-spin" />
							</span>
						)}
						{getValues("optVerified") && (
							<span className="bg-white inline-flex w-24 h-10 items-center justify-end absolute top-1 right-3">
								<Icon width={24} icon="mdi:email-check-outline" className="text-green-500" />
							</span>
						)}
						{errors.Email && <span className="text-red-500 text-xs ml-2">{errors.Email?.message}</span>}
					</div>
					<div>
						<FloatingLabelInput type="password" register={register("Password")} />
						{errors.Password && (
							<span className="text-red-500 text-xs pl-2">{errors.Password?.message}</span>
						)}
					</div>

					<div>
						<FloatingLabelInput type="password" name="Confirm Password" register={register("CPassword")} />
						{errors.CPassword && (
							<span className="text-red-500 text-xs pl-2">{errors.CPassword?.message}</span>
						)}
					</div>
				</div>
				<div className="flex select-none mt-7 text-[#0000008A]">
					<input
						id="marketing"
						type="checkbox"
						{...register("MarketingEmail")}
						className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<label htmlFor="marketing" className="relative -top-[2px] cursor-pointer ml-1.5 block text-sm">
						Send me Marketing Emails about Tata Technologies Products and Services
					</label>
				</div>
				<button
					disabled={!isDirty || !isValid || option.isLoading}
					onClick={handleSubmit(onSubmit)}
					className="disabled:(opacity-40 cursor-not-allowed) block w-full bg-[#1869B3] tracking-wide py-4 mt-6 rounded-md text-white font-bold mb-2"
				>
					Create Account
				</button>

				<SocialLogin />
			</section>
			{isVerified && <OtpModal Email={getValues("Email")} handleVerify={otp => handleOtp(otp)} />}
		</>
	);
}

export default SignUpContainer;
