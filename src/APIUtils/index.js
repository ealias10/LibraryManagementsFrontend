import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
export const urls = {
	development: API_BASE_URL,
};

const api = axios.create({
	baseURL: urls[process.env.NODE_ENV],
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export const getToken = () => {
	return localStorage.getItem(ACCESS_TOKEN);
};

// ------------------------------------------------------------Authenticated User related API's--------------------------------------------------------------------------------------------//
export const getCurrentUser = () => {
	axios.defaults.headers.Authorization = `Bearer ${getToken()}`;
	const url = `${urls.development}/email/login`;
	return axios.get(url);
};

export const getSignup = (userCreditionals) => {
	axios.defaults.headers.Authorization = ` `;
	const url = `${urls.development}/email/signup`;
	return axios.post(url, userCreditionals);
};
export const login = (userCreditionals) => {
	axios.defaults.headers.Authorization = ` `;
	const url = `${urls.development}/user/login`;
	alert(url);
	alert(JSON.stringify(userCreditionals));
	return axios.post(url, userCreditionals);
};
export const getSignupByCustomer = (userCreditionals) => {
	axios.defaults.headers.Authorization = ` `;
	const url = `${urls.development}/user/customer/create`;
	return axios.post(url, userCreditionals);
};
export const forgotPassword = (userCreditionals) => {
	axios.defaults.headers.Authorization = ` `;
	const url = `${urls.development}/forgot-password`;
	return axios.post(url, userCreditionals);
};

export const logout = () => {
	axios.defaults.headers.Authorization = `Bearer ${getToken()}`;
	const url = `${urls.development}/logout-user`;
	return axios.post(url);
};

// ------------------------------------------------------------Spaces operations related API's----------------------------------------------------------------------------------------------//

export default api;
