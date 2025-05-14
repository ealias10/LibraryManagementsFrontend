import Router from "next/router";
import * as api from "../../APIUtils";
import { useContext, useRef } from "react";
import Notifications, { notify } from "react-notify-toast";
import { ACCESS_TOKEN } from "../../constants";
import { AuthContext } from "../../Auth";
import { useForm } from "react-hook-form";

const forgotPassword = () => {
    const { currentUser, setCurrentUserData } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const formRef = useRef(null);

    const forgotPassword = ({ loginEmail, userGroupId }) => {
        const userCredentials = {
            email_or_username: loginEmail,
            user_group_id: userGroupId,
        };
        api
            .forgotPassword(userCredentials)
            .then((response) => {
                if (response.data.status === 200) {
                    notify.show(
                        "Successfully send password reset OTP to email"
                    );
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

    const submit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true }),
            );
        }
    };
    const getLogIn = () => {
        Router.push("/login");
    }

    return (
        <>
            <div className="login-div">
                <Notifications />
                <div className="login-header">
                    <span className="login-text">ForgotPassword</span>
                </div>
                <div className="w-full">
                    <form
                        className="px-8 pt-6 pb-8 mb-4"
                        ref={formRef}
                        onSubmit={handleSubmit(forgotPassword)}
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
                                placeholder="Email"
                                {...register("loginEmail", {
                                    required: true,
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="userGroupId"
                            >
                                UserGroupId
                            </label>
                            <input
                                className={`${errors.userGroupId && "border-red-500 "
                                    }shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                id="userGroupId"
                                type="text"
                                placeholder="userGroupId"
                                {...register("userGroupId", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="flex items-center justify-between ">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => submit()}
                            >
                                Send
                            </button>
                        </div>
                        <span class="psw"> <a onClick={() => getLogIn()}>Back</a></span>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2025  auth-service. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default forgotPassword;
