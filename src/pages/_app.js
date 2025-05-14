/* eslint-disable react/jsx-props-no-spreading */
import { React } from "react";
import "../styles/global.css";
import "../styles/login.css";
import "../styles/dashboard.css";
import "../styles/navbar.css";
import "../styles/header.css";
import "../styles/loader.css";
import "../styles/filter.css";

import { AuthProvider } from "../Auth";

export default function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}
