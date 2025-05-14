/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Pagination = (props) => {
	const [pageSize, setPageSize] = useState();
	const [totalCount, setTotalCount] = useState("");
	const [pageNumber, setPageNumber] = useState();

	const router = useRouter();

	useEffect(() => {
		if (props.pagination) {
			const { totalCount, pageNumber, pageSize } = props.pagination;
			setTotalCount(totalCount);
			setPageNumber(pageNumber);
			setPageSize(pageSize);
		}
	}, [props.pagination]);

	useEffect(() => {
		if (
			pageNumber &&
			pageSize &&
			(props.pagination.pageNumber !== pageNumber ||
				props.pagination.pageSize !== pageSize)
		)
			props.onChangePage({ pageSize, pageNumber });
	}, [pageSize, pageNumber]);

	const handlePageSize = (event) => {
		setPageNumber(1);
		setPageSize(event.target.value);
	};

	const handlePageNumber = (val) => {
		switch (val) {
			case "next":
				setPageNumber(pageNumber + 1);
				break;
			case "prev":
				setPageNumber(pageNumber - 1);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<nav className="flex flex-wrap  h-101 p-8 items-center">
				<div className="flex  flex-row px-5 w-full items-center">
					<span className="text-sm mr-5">show</span>
					<select
						className="border border-gray-400 rounded px-2 mr-5 cursor-pointer"
						value={pageSize}
						onChange={(e) => handlePageSize(e)}
					>
						{router && router.route === "/merchant-info/kyc-dashboard" ? (
							<>
								<option>4</option>
								<option>6</option>
								<option>8</option>
								<option>10</option>
							</>
						) : (router && router.route === "/qris/bulk-upload") ||
						  (router && router.route === "/qris") ? (
							<>
								<option>10</option>
								<option>20</option>
								<option>100</option>
								<option>200</option>
								<option>500</option>
								<option>1000</option>
								<option>2000</option>
								<option>5000</option>
								<option>10000</option>
							</>
						) : (
							<>
								<option>10</option>
								<option>20</option>
							</>
						)}
					</select>
					<span className="text-sm text-black mr-5">entries</span>
					<span className="text-sm text-gray-400 mr-5">
						showing{" "}
						{totalCount === 0
							? 0 - 0
							: totalCount > pageNumber * pageSize
							? `${(pageNumber - 1) * pageSize + 1 || "0"}-${
									pageNumber * pageSize || "0"
							  }`
							: `${(pageNumber - 1) * pageSize + 1 || "0"}-${
									totalCount || "0"
							  }`}{" "}
						of {totalCount || "0"} entries
					</span>
					<div className="flex flex-row ml-auto mr-0 items-center ">
						<button
							type="button"
							className="flex flex-row items-center mr-5 pagination-button text-blue-400"
							onClick={() => handlePageNumber("prev")}
							disabled={!pageNumber || pageNumber <= 1}
						>
							<ArrowLeftIcon className="h-5 w-5 mr-2" />
							<span className="text-sm font-bold">prev</span>
						</button>
						{/* <span className="flex flex-row items-center text-gray-900 ">
							{router && router.route === "/merchant-info/kyc-dashboard" ? (
								<span className="text-gray-400">|</span>
							) : (
								pageNumber || 0
							)}
						</span> */}
						<button
							type="button"
							className="flex flex-row items-center pagination-button text-blue-400 ml-5"
							onClick={() => handlePageNumber("next")}
							disabled={!totalCount || totalCount <= pageNumber * pageSize}
						>
							<span className="text-sm font-bold">next</span>
							<ArrowRightIcon className="h-5 w-5 ml-2" />
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};
