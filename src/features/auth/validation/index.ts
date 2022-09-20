import * as Yup from "yup";

const regex = {
	email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{12,}$/
};

const message = {
	email: {
		required: "Email is required",
		regex: "Invalid email address"
	},
	password: {
		required: "Password is required",
		regex: "Use 12 or more characters with a mix of letters, numbers & symbols",
		cpassword: "Password must match"
	}
};

const emailSchema = Yup.object().shape({
	Email: Yup.string().required(message.email.required).matches(regex.email, message.email.regex)
});

const passwordSchema = Yup.object().shape({
	Password: Yup.string().required(message.password.required).matches(regex.password, message.password.regex),
	CPassword: Yup.string()
		.required(`Confirm ${message.password.required}`)
		.matches(regex.password, "Use 12 or more characters with a mix of letters, numbers & symbols")
		.oneOf([Yup.ref("Password"), null], "Password must match")
});

const loginSchema = emailSchema.concat(
	Yup.object().shape({
		EncPassword: Yup.string().required("Password is required")
	})
);

const forgotPasswordSchema = emailSchema.concat(Yup.object().shape({}));

const signUpSchema = Yup.object().shape({
	FirstName: Yup.string().required("First Name is required"),
	LastName: Yup.string().required("Last Name is required"),
	Email: Yup.string().required("Email is required").matches(regex.email, "Invalid email address"),
	Password: Yup.string()
		.required("password is required")
		.matches(regex.password, "Use 12 or more characters with a mix of letters, numbers & symbols"),
	CPassword: Yup.string()
		.required("Confirm Password is required")
		.matches(regex.password, "Use 12 or more characters with a mix of letters, numbers & symbols")
		.oneOf([Yup.ref("Password"), null], "Password must match"),
	MarketingEmail: Yup.boolean(),
	optVerified: Yup.boolean().required("Email not verified")
});
