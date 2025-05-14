/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import Router from "next/router";
import * as api from "../APIUtils";
import { ACCESS_TOKEN } from "../constants";
import { notify } from "react-notify-toast";

const AuthContext = createContext();

const unAuthorisedPaths = ["/login", "/forgot-password", "/signup"];

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		if (typeof window !== "undefined") {
			const { pathname } = Router;

			if (!unAuthorisedPaths.includes(pathname)) {
				const token = localStorage.getItem(ACCESS_TOKEN);
				getCurrentUser();
				// If there is no access token we redirect to "/login" page.
				if (!token) {
					Router.push("/login");
					return null;
				}
			}
		}
		return false;
	}, []);

	const getCurrentUser = async () => {
		await api
			.getCurrentUser()
			.then((response) => {
				if (response.data.status === 200) setCurrentUser(response.data.data[0]);
				else Promise.reject(new Error("Fetching current user failed"));
			})
			.catch((error) => {
				localStorage.removeItem(ACCESS_TOKEN);
			});
	};

	const setCurrentUserData = (data) => {
		setCurrentUser(data);
	};

	const handleLogout = () => {
		api
			.logout()
			.then((response) => {
				if (response.data.status === 200) {
					setCurrentUser({});
					localStorage.removeItem(ACCESS_TOKEN);
					Router.push("/login");
				} else {
					notify.show("Error while logout ", "error", 3000);
				}
			})
			.catch((error) => {
				notify.show("Error while logout ", "error", 3000);
			});
	};

	const verifyToken = () => {
		return true;
	};

	const isAuthenticated = () => {
		if (typeof window !== "undefined") {
			try {
				const { pathname } = Router;
				const token = localStorage.getItem(ACCESS_TOKEN);

				if (!unAuthorisedPaths.includes(pathname)) {
					if (token) {
						return verifyToken();
					}
					return false;
				}
				if (pathname === "/login" && token) {
					if (token) {
						if (verifyToken) {
							if (Object.keys(currentUser).length === 0) getCurrentUser();
							Router.push("/properties");
						}
						return false;
					}

					return true;
				}
				return true;
			} catch (error) {
				throw new Error("Redirection error");
			}
		}
		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				isAuthenticated,
				handleLogout,
				getCurrentUser,
				setCurrentUserData,
			}}
		>
			<>{isAuthenticated() && children}</>
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
