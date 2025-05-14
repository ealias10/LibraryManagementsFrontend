/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDebounce } from "../utils";
import { availableStatus } from "../data/people";
import { Select } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import * as api from "../APIUtils";

export const Filter = (props) => {
	const [filterValue, setFilterValue] = useState("all");

	const handleChange = (event) => {
		setFilterValue(event.target.name);

		const filterVal = event.target.name === "all" ? "" : event.target.name;
		props.onChange(filterVal);
	};

	useEffect(() => {
		if (props.filterVal !== filterValue && props.filterVal) {
			setFilterValue(props.filterVal);
		}
	}, [props.filterVal]);

	return (
		<>
			<nav className="flex flex-wrap  h-101 p-8 items-center">
				<div className="flex  flex-row px-5 w-full items-center">
					<span className="text-xl font-bold mr-10">Filter</span>
					<button
						type="button"
						className={
							filterValue === "all"
								? "bg-blue-500 hover:bg-blue-600 text-sm    text-white mr-2 py-2 px-4 rounded shadow"
								: "bg-white hover:bg-gray-100 text-sm text-gray-500 mr-2 py-2 px-4 border border-gray-200 rounded shadow"
						}
						name="all"
						onClick={(e) => handleChange(e)}
					>
						All
					</button>

					{availableStatus.map((status) => (
						<button
							type="button"
							key={status}
							className={
								filterValue === status
									? "bg-blue-500 hover:bg-blue-600 text-sm    text-white mr-2 py-2 px-4 rounded shadow"
									: "bg-white hover:bg-gray-100 text-sm text-gray-500 mr-2 py-2 px-4 border border-gray-200 rounded shadow"
							}
							name={status}
							onClick={(e) => handleChange(e)}
						>
							{status}
						</button>
					))}
					<span className="text-gray-500 text-sm">
						Result :{" "}
						{props.pageUserListCount > props.totalCount
							? props.totalCount
							: props.pageUserListCount}{" "}
						out of {props.totalCount} entries
					</span>
				</div>
			</nav>
		</>
	);
};

export const UserFilter = (props) => {
	const [searchTerm, setSearchTerm] = useState(null);
	const [filterValue, setFilterValue] = useState("all");
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);
	const { data } = props;

	useEffect(() => {
		if (debouncedSearchTerm) {
			searchFunction(debouncedSearchTerm);
		} else if (searchTerm !== null) {
			searchFunction("");
		}
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (data) {
			setSearchTerm(data);
		}
	}, [data]);

	const searchFunction = (searchVal) => {
		props.onSearch(searchVal);
	};

	const handleSearchBar = () => {
		return (
			<div
				className={`
            flex items-centre z-2 py-2 px-2 h-10 flex-row
            border bg-white rounded filterSearchWidth zindex  rounded-lg mr-2 mt-2
          `}
			>
				<div className="search-div" />
				<input
					className="rounded p-2 text-sm w-full outline-none bg-white"
					type="text"
					placeholder="Type Text to search"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
			</div>
		);
	};

	return (
		<>
			<nav className="flex flex-wrap  h-101 p-6 items-center">
				<div className="flex  flex-row px-5 w-full items-center">
					<div className="flex flex-row items-center">
						<span className="text-gray-500 text-sm pt-2 ml-6  w-24">
							Search by
						</span>
						<div className="mr-4 mt-2 w-56">
							<Select
								className="custom-select"
								style={{
									width: "100%",
								}}
								defaultValue={"email"}
								placeholder="choose property type"
								onChange={(value) => {
									props.onSearchTypeChange(value);
									setSearchTerm("");
								}}
								options={[
									{
										value: "email",
										label: "Email",
									},
									{
										value: "phone",
										label: "Phone",
									},
								]}
								size="large"
							/>
						</div>
						{handleSearchBar()}
						<span className="text-gray-500 text-sm pt-2 ml-6 w-56">
							Result :{" "}
							{props.pageUserListCount > props.totalCount
								? props.totalCount
								: props.pageUserListCount}{" "}
							out of {props.totalCount} entries
						</span>
					</div>
				</div>
			</nav>
		</>
	);
};

export const SpaceFilter = (props) => {
	const [searchTerm, setSearchTerm] = useState(null);
	const [filterValue, setFilterValue] = useState("all");
	const [cost, setCost] = useState({
		minCost: "",
		maxCost: "",
	});
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);
	const debouncedFilterTerm = useDebounce(cost, 1000);
	const [cityOption, setCityOption] = useState([]);

	useEffect(() => {
		getCities();
	}, []);

	useEffect(() => {
		if (debouncedSearchTerm) {
			searchFunction(debouncedSearchTerm);
		} else if (searchTerm !== null) {
			searchFunction("");
		}
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (debouncedFilterTerm) {
			if (
				cost.minCost &&
				cost.maxCost &&
				Number(cost.maxCost) > Number(cost.minCost)
			) {
				onCostChange(debouncedFilterTerm);
			} else if (!cost.maxCost && !cost.minCost) {
				onCostChange(cost);
			}
		}
	}, [debouncedFilterTerm]);

	const searchFunction = (searchVal) => {
		props.onSearch(searchVal);
	};
	const onCostChange = (cost) => {
		props.onCostChange(cost);
	};
	const getCities = () => {
		api
			.getCities()
			.then((response) => {
				if (response.data.status === 200) {
					const option = response.data.data.map((item) => ({
						value: item?.id,
						label: item?.name,
					}));
					setCityOption(option);
				}
			})
			.catch(() => {
				notify.show("Error while fetching cities ", "error", 3000);
			});
	};

	const handleSearchBar = () => {
		return (
			<div
				className={`flex items-centre z-2 py-2 px-2 h-10 flex-row border bg-white rounded zindex rounded-lg mt-2 search-filed`}
			>
				<div className="search-div" />
				<input
					className="rounded p-2 text-sm w-full outline-none bg-white"
					type="text"
					placeholder="Search by property name or manger name"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
			</div>
		);
	};

	return (
		<>
			<nav className="flex flex-wrap  h-101 p-6 items-center">
				<div className="flex  flex-row px- w-full items-center">
					<div className="flex flex-row items-center">
						{handleSearchBar()}
						<span className="text-xl font-bold mr-6 ml-6 whitespace-nowrap mt-2">
							Filter :
						</span>
						<span className="text-base font-medium mr-2 mt-2 text-gray-500">
							City
						</span>
						<Select
							style={{
								width: "165px",
							}}
							placeholder="Choose City"
							onChange={(value) => props.onCityChange(value)}
							options={cityOption}
							size="large"
							className="mt-2 w-20 custom-select"
							allowClear
						/>
						<span className="text-base ml-8 mt-2 mr-2 font-medium text-gray-500">
							Cost
						</span>
						<div
							className={`flex items-centre z-2 mr-2 py-2 px-2 h-10 flex-row border w-36 bg-white rounded zindex rounded-lg mt-2 `}
						>
							<input
								className="rounded p-2 text-sm w-full outline-none bg-white"
								type="number"
								placeholder="Minimum"
								value={cost.minCost}
								onChange={(event) =>
									setCost({
										...cost,
										minCost: event.target.value,
									})
								}
							/>
						</div>
						<div
							className={`flex items-centre z-2 py-2 px-2 h-10 flex-row border w-36 bg-white rounded zindex rounded-lg mt-2 `}
						>
							<input
								className="rounded p-2 text-sm w-full outline-none bg-white"
								type="number"
								placeholder="Maximum"
								value={cost.maxCost}
								onChange={(event) =>
									setCost({
										...cost,
										maxCost: event.target.value,
									})
								}
							/>
						</div>
						<CloseCircleOutlined
							style={{ fontSize: "20px", color: "#9ca3af" }}
							className="ml-2 mt-2 cursor-pointer"
							onClick={() => {
								setCost({ minCost: "", maxCost: "" });
							}}
						/>
						<span className="text-gray-500 text-sm pt-2 ml-6 w-56  whitespace-nowrap">
							Result :{" "}
							{props.pageUserListCount > props.totalCount
								? props.totalCount
								: props.pageUserListCount}{" "}
							out of {props.totalCount} entries
						</span>
					</div>
				</div>
			</nav>
		</>
	);
};
