import { useState } from "react";
import { Icon } from "@iconify/react";
import OtpInput from "react-otp-input";
import { toast } from "react-hot-toast";
import CountDownTimer from "./CountDownTimer";
import { useSendVerifyEmailMutation, useVerifyOtpMutation } from "~/services/auth";

type TOtpModal = {
	Email: String;
	handleVerify: (otp?: string) => void;
};

const timing = 30;
const numInputs = 4;

export function OtpModal({ Email, handleVerify }: TOtpModal) {
	const [verifyOtp, options] = useVerifyOtpMutation();
	const [sendOtp] = useSendVerifyEmailMutation();
	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(timing);

	const handleChange = (otp: any) => setOtp(otp);

	const handleSubmit = () => {
		verifyOtp({ Email, otp }).then((resp: any) => {
			if (resp.data.Status === "F") {
				toast.error(resp.data.Message);
				return;
			}
			handleVerify(otp);
			toast.success(resp.data.Message);
		});
	};

	const handleOtpSend = () => {
		setOtp("");
		sendOtp({ Email }).then((resp: any) => {
			if (resp.data) {
				setTimer(timing);
				toast.success(resp.data.Message);
			}
		});
	};

	return (
		<div
			id="defaultModal"
			className="animate-opacity backdrop-filter backdrop-blur bg-white/30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
			aria-modal="true"
			role="dialog"
		>
			<div className="relative p-4 w-full max-w-sm h-full md:h-auto">
				<div className="relative bg-white rounded-lg shadow p-10">
					<button className="border-none p-3 absolute top-3 right-3" onClick={() => handleVerify()}>
						<Icon icon="ic:baseline-close" width={18} color="text-[#C7CFD761]" />
					</button>
					<h3 className="text-xl font-semibold text-gray-900 text-center">OTP Verification</h3>
					<OtpInput
						containerStyle="flex flex-row justify-between mt-5"
						inputStyle="border h-12 !w-12 text-center form-control rounded text-lg font-semibold"
						value={otp}
						isInputNum
						shouldAutoFocus
						onChange={(otp: any) => handleChange(otp)}
					/>

					<div className="flex items-center space-x-3 my-5 items-center justify-center text-xs">
						<CountDownTimer hours={0} minutes={0} seconds={timer} onTimeUp={() => setTimer(0)} />
						<button
							className={`${
								timer === 0 ? "cursor-pointer text-blue-500" : "text-[#C7CFD761] pointer-events-none"
							}`}
							onClick={() => handleOtpSend()}
						>
							Resend OTP
						</button>
					</div>
					<button
						disabled={otp.length < numInputs || options.isLoading}
						onClick={() => handleSubmit()}
						className="disabled:(opacity-40 cursor-not-allowed) block w-full bg-[#1868B3] tracking-wide py-3 mt-6 rounded-md text-white mb-2"
					>
						Verify
					</button>
				</div>
			</div>
		</div>
	);
}
