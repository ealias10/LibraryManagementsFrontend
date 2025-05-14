import { ArrowLeftIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import Notifications from "react-notify-toast";
import React, { useEffect, useState } from "react";

export const VerificationHeader = (props) => {
	const router = useRouter();
	const [fromPage, setFromPage] = useState("");

	const { headerName } = props;

	useEffect(() => {
		const {
			query: { fromPage },
		} = Router;
		setFromPage(fromPage);
	}, [router]);

	const getHeaderName = (fromPage) => {
		switch (fromPage) {
			case "Properties":
				return "Property name : ";
			case "Customer":
				return "Username : ";
			default:
				break;
		}
	};

	const returnHomePage = (fromPage) => {
		switch (fromPage) {
			case "Properties":
				Router.push("/properties");
				break;
			case "Customer":
				Router.push("/customers");
				break;
			default:
				break;
		}
	};

	const handleHeaderData = () => {
		return (
			<div className="w-10/12">
				<div className="mt-5 flex items-center grid grid-flow-row grid-cols-6 grid-rows-2 gap-x-4">
					{/* List the 6 column names */}
					<span className="text-s font-bold text-gray-400">
						{getHeaderName(fromPage)}
					</span>

					<span className="text-sm font-medium py-1">{headerName || "-"}</span>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="bg-white border-b border-gray-200">
				<Notifications />
				<div className="flex px-8 py-6 flex-col">
					<div className="flex flex-row items-center">
						<div className="flex flex-row items-center">
							<button className="hover:text-blue-400" type="button">
								<ArrowLeftIcon
									className="h-5 w-5 mr-5"
									onClick={() => returnHomePage(fromPage)}
								/>
							</button>
						</div>
					</div>

					<div className="flex flex-row items-center">{handleHeaderData()}</div>
				</div>

				<div className="py-2 align-middle sm:px-6 flex justify-center lg:px-4" />
			</div>
		</>
	);
};
