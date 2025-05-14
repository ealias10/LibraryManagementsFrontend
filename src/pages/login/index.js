import Router from "next/router";
import * as api from "../../APIUtils";
import { useContext, useRef } from "react";
import Notifications, { notify } from "react-notify-toast";
import { ACCESS_TOKEN } from "../../constants";
import { AuthContext } from "../../Auth";
import { useForm } from "react-hook-form";

const Login = () => {
	const { currentUser, setCurrentUserData } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const formRef = useRef(null);

	const login = ({ loginEmail, loginPassword }) => {
		const userCredentials = {
			username: loginEmail,
			password: loginPassword,
		};
		api
			.login(userCredentials)
			.then((response) => {
				if (response.data.status === 200) {
					localStorage.setItem(
						ACCESS_TOKEN,
						response.data.data[0].access_token,
					);
					Router.push("/user/dashboard")
				}
			})
			.catch(() => {
				notify.show(
					"Failed to Login please check password user name are correct",
					"error",
					3000,
				);
			});
	};
	const getForgotPassword = () => {
		Router.push("/forgot-password");
	};
	const getSignup = () => {
		Router.push("/signup");
	};

	const submit = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(
				new Event("submit", { cancelable: true, bubbles: true }),
			);
		}
	};

	return (
		<>
			<div className="login-div">
				<Notifications />
				<div className="login-header">
					<span className="login-text">Login</span>
				</div>
				<div className="w-full">
					<form
						className="px-8 pt-6 pb-8 mb-4"
						ref={formRef}
						onSubmit={handleSubmit(login)}
					>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="username"
							>
								Email
							</label>
							<input
								className={`${errors.loginEmail && "border-red-500 "
									}shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
								id="username"
								type="text"
								placeholder="UserName"
								{...register("loginEmail", {
									required: true,

								})}
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className={`${errors.loginPassword && "border-red-500 "
									}shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
								id="password"
								type="password"
								placeholder="******************"
								{...register("loginPassword", { required: true })}
							/>
						</div>
						<div className="flex items-center justify-between ">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="button"
								onClick={() => submit()}
							>
								Login
							</button>
						</div>
						<div className="flex items-center justify-between ">
							<span class="psw"><a onClick={() => getForgotPassword()}>Forgot password?</a></span>
							<button
								className="signup-button"
								type="button"
								onClick={() => getSignup()}
							>
								Signup
							</button>
						</div>
					</form>
					<p className="text-center text-gray-500 text-xs">
						&copy;2025  auth-service. All rights reserved.
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
