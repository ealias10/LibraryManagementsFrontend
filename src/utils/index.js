import { useState, useEffect } from "react";
import moment from "moment";
import { getPDF } from "../APIUtils";

export const zeroPad = (num, places) => String(num).padStart(places, "0");

// Our hook
export const useDebounce = (value, delay) => {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() => {
			// Set debouncedValue to value (passed in) after the specified delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// Return a cleanup function that will be called every time ...
			// ... useEffect is re-called. useEffect will only be re-called ...
			// ... if value changes (see the inputs array below).
			// This is how we prevent debouncedValue from changing if value is ...
			// ... changed within the delay period. Timeout gets cleared and restarted.
			// To put it in context, if the user is typing within our app's ...
			// ... search box, we don't want the debouncedValue to update until ...
			// ... they've stopped typing for more than 500ms.
			return () => {
				clearTimeout(handler);
			};
		},
		// Only re-call effect if value changes
		// You could also add the "delay" var to inputs array if you ...
		// ... need to be able to change that dynamically.
		[value],
	);

	return debouncedValue;
};

export const numberWithCommas = (string) => {
	if (!string) return "";
	const parts = string && string?.toString?.()?.split?.(".");
	parts[0] = parts?.[0]?.replace?.(/\B(?=(\d{3})+(?!\d))/g, ".");
	return parts?.join?.(".");
};

export const getDate = (date) => {
	const formatDate = moment(date).format("DD MMM YYYY, h:mm:ss ");
	if (formatDate === "Invalid date") {
		return null;
	}
	return formatDate;
};
export const getRandomKey = () => Math.floor(Math.random() * 100) + 1;

// eslint-disable-next-line consistent-return
export const truncateText = (str, len = 11) => {
	if (!str) {
		return null;
	}
	if (str?.length < len) {
		return str;
	}

	return `${str.substring(0, len)}...`;
};

export const dateFormat = (date, oldFormat, newformat) => {
	if (!date || !oldFormat || !newformat) return "";
	const formatDate = moment(date, oldFormat).format(newformat);
	if (formatDate === "Invalid date") {
		return null;
	}
	return formatDate;
};
export const dateTimeFormatConverter = (date, type) =>
	date ? moment(date).format(type) : "";

export const downloadPdf = (url) => {
	getPDF(url).then((resp) => {
		const file = new Blob([resp.data], { type: "application/pdf" });

		// process to auto download it
		const fileURL = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.href = fileURL;
		link.download = `Loan Agreement.pdf`;
		link.target = "_blank";
		link.click();
		link.remove();
	});
};

export const indoCurrencyConverter = (amount) => {
	if (!amount) return "";
	const removeDot = String?.(amount)?.replaceAll?.(".", "");
	const isCommaPresent = removeDot?.includes(",");
	const [integerAmount, decimalAmount] = String?.(removeDot)?.split(",");
	const isDecimalPresent =
		decimalAmount || isCommaPresent ? `,${decimalAmount}` : "";

	return `${numberWithCommas(integerAmount)}${isDecimalPresent}`;
};

export const floatToIndoCurrency = (amount) => {
	if (amount !== 0 && !amount) return "";
	const replaceDot = String?.(amount)?.replaceAll(".", ",");
	const [intAmount, decAmount] = replaceDot?.split(",");
	const isDecimalPresent = decAmount ? `,${decAmount}` : "";
	return `${numberWithCommas(intAmount)}${isDecimalPresent}`;
};

export const titleCase = (str) => {
	let newStr;

	if (str) {
		const splitStr = str.toLowerCase().split(" ");

		splitStr.forEach(
			// eslint-disable-next-line no-return-assign
			(item, i) =>
				(splitStr[i] =
					splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)),
		);

		newStr = splitStr.join(" ");
	}

	return newStr;
};

export const convertToDots = (text) => {
	if (text) {
		const withoutComma = String(text).replaceAll(".", "");
		return withoutComma.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
	return "";
};

export const removeDots = (text) => text.split(".").join("");
const currencyCode = [
	{
		name: "India",
		code: "INR",
		countryCode: "+91",
	},
	{
		name: "USA",
		code: "USD",
		countryCode: "+1",
	},
	{
		name: "UK",
		code: "GBP",
		countryCode: "+44",
	},
	{
		name: "Australia",
		code: "AUD",
		countryCode: "+61",
	},
	{
		name: "UAE",
		code: "AED",
		countryCode: "+971",
	},
];
export const getCurrencyCode = (country) => {
	if (country) {
		return currencyCode.find((item) => item.name === country);
	}
	return null;
};

export const antCustomStyle = {
	borderColor: "rgb(217, 215, 214)",
	boxShadow: "none",
};
