/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { AuthContext } from "../Auth";
import { useDebounce } from "../utils";

export const Header = (props) => {
	const router = useRouter();
	const { currentUser, handleLogout } = useContext(AuthContext);
	const { email } = currentUser;
	const { pathname } = router;
	const { data } = props;
	const [searchTerm, setSearchTerm] = useState(null);
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);

	const handleHeaderName = () => {
		switch (pathname) {
			case "/users":
			case "/users/[id]":
				return "Users";
			default:
				return "Home";
		}
	};

	const wheatherHeaderNameExists = () => {
		const headerArray = ["Property"];

		return headerArray.includes(handleHeaderName());
	};

	const getSearchText = () => {
		switch (pathname) {
			case "/properties/tours":
				return "Search property name, location";
			case "/properties":
				return "Search property name";
			default:
				return "Search full name, User ID";
		}
	};

	useEffect(() => {
		if (wheatherHeaderNameExists()) {
			if (debouncedSearchTerm) {
				// Set isSearching state
				// Fire off our API call
				searchFunction(debouncedSearchTerm);
			} else if (searchTerm !== null) {
				searchFunction("");
			}
		}
		// Make sure we have a value (user has entered something in input)
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (wheatherHeaderNameExists() && data) {
			setSearchTerm(data);
		}
	}, [data]);

	const searchFunction = (searchVal) => {
		props.onChange(searchVal);
	};

	const handleSearchBar = () => {
		return (
			<div
				className={`
            flex items-centre z-2 py-2 px-2 h-10 flex-row
            border border-gray-200 rounded searchWidth zindex listing-page-search-input rounded-lg
          `}
			>
				<div className="search-div" />
				<input
					className="rounded p-2 text-sm w-full outline-none"
					type="text"
					placeholder={getSearchText(handleHeaderName())}
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
			</div>
		);
	};

	return (
		<>
			<nav className="flex flex-wrap bg-white h-101 py-4 w-full border-b border-gray-200">
				<div className="flex flex-row px-5 w-full items-center">
					<span className="text-xl font-bold mr-10 ml-4">
						{handleHeaderName()}
					</span>
					<div className="flex ml-auto cursor-pointer	hover:bg-gray-100 px-3 py-2 rounded">
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<img
											className="h-10 w-10 rounded-full"
											alt="menu"
											src={
												"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
											}
										/>
									</div>
									<div className="ml-4 mr-5">
										<div className="text-sm font-medium text-gray-900">
											{email}
										</div>
										<div className="text-sm text-gray-500">
											{currentUser?.role_info?.role}
										</div>
									</div>
									<ChevronDownIcon className="h-6 w-6 " />
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute w-full mt-2 origin-top-right bg-gray-100 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="px-1 py-1 ">
										<span className="px-2 py-2 text-gray-600"> {email}</span>
										<Menu.Item>
											{() => (
												<button
													type="button"
													className="bg-violet-500 text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-blue-200"
													onClick={() => handleLogout()}
												>
													Logout
												</button>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</nav>
		</>
	);
};
