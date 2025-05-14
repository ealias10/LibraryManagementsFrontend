/* eslint-disable  */
import React, { useState, useEffect, useContext } from "react";
import Router, { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { AuthContext } from "../Auth";
import { set } from "date-fns";
import {
	ContainerTwoTone,
	UserOutlined,
	IdcardFilled,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
const properties = "/properties";
const customers = "/customers";
const users = "/users";
const employeeDashboard = "/admin/RolePermission";

export const Navbar = (props) => {
	const { currentUser, handleLogout } = useContext(AuthContext);
	const [headerValue, setHeaderValue] = useState();
	const router = useRouter();
	const [openSideBar, setOpenSideBar] = useState(
		router.query.openSideBar === "true",
	);

	const closeNavbar = () => {
		setOpenSideBar(!openSideBar);
		if (props.closeNavbar) {
			props.closeNavbar();
		}
	};

	useEffect(() => {
		const { pathname } = Router;
		setHeaderValue(pathname);
	});

	const navigatePage = (path) => {
		Router.push({
			pathname: path,
			query: {
				openSideBar: openSideBar,
			},
		});
	};

	const handleChange = (event) => {
		const page = event.currentTarget.name;
		switch (page) {
			// case properties:
			// 	navigatePage(properties);
			// 	break;
			// case customers:
			// 	navigatePage(customers);
			// 	break;
			// case users:
			// 	navigatePage(users);
			// 	break;
			default:
				break;
		}
	};

	const handleDashboardPages = (value, path) => {
		return (
			<Disclosure.Panel
				static={headerValue == path}
				className="px-4 pt-4 pb-2 text-sm  ml-5"
			>
				<button
					type="button"
					className="flex"
					name={value}
					onClick={() => router.push({ pathname: `${path}` })}
				>
					<h1
						className={`
          pt-1/2 mx-5 bg-white ml-8 text-black-300 whitespace-nowrap navSubTextFont
          ${headerValue == path ? "textEnabled" : "text-black-300"}
          `}
					>
						{value}
					</h1>
				</button>
			</Disclosure.Panel>
		);
	};

	const getIcons = (path) => {
		switch (path) {
			case properties:
				return (
					<ContainerTwoTone
						style={{ fontSize: "23px" }}
						twoToneColor={`${headerValue == path ? "#2f74f5" : "#9ca3af"}`}
					/>
				);
			case customers:
				return (
					<ImProfile
						style={{
							fontSize: "23px",
							color: headerValue == path ? "#2f74f5" : "#9ca3af",
						}}
					/>
				);
			case users:
				return (
					<FaUserFriends
						style={{
							fontSize: "23px",
							color: headerValue == path ? "#2f74f5" : "#9ca3af",
						}}
					/>
				);
		}
	};

	const handleAdminNavebar = (value, path) => {
		return (
			<div className="pb-10">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="container mx-auto flex">
								<button
									type="button"
									className="flex buttons-setting"
									name={path}
									onClick={(event) => handleChange(event)}
								>
									<div className={headerValue == path ? "selector" : ""} />
									<div className="flex pl-5"></div>
									{getIcons(path)}
									<h1
										className={`px-1 mx-5 bg-white text-lg text-black-300 whitespace-nowrap navFont`}
									>
										{value}
									</h1>
								</button>
							</Disclosure.Button>
						</>
					)}
				</Disclosure>
			</div>
		);
	};

	return (
		<>
			<nav
				className={`${openSideBar ? "openSideNav" : "closeSideNav"
					} nav bg-white h-max min-h-screen pb-8 border-r border-gray-200 `}
			>
				<div
					onClick={() => setOpenSideBar(!openSideBar)}
					className={`${openSideBar ? "hideNavIcon" : "openNavIcon"}`}
				></div>
				<div className="d-flex flex-col flex-fill py-1 items-start overflow-hidden">
					<div>
						<div className="flex ml-5 w-full justify-between align-center">
							<div className="logo-title-wrapper flex justify-center align-center">
								<div className={"logo"}></div>
								<h1 className="px-1 ml-6 bg-white text-2xl  font-bold site-title">
									LibraryManagement
								</h1>
							</div>
							<div
								onClick={() => closeNavbar()}
								className={`${openSideBar ? "closeNavIcon" : ""}`}
							></div>
							<img
								className="panacea-mobile-close"
								src="/panacea/cross.png"
								onClick={() => closeNavbar()}
							/>
						</div>
					</div>
					{/* Admin user nav menus */}
					{
						<>
							{/* {handleAdminNavebar("Properties", properties)}
							{handleAdminNavebar("Customers", customers)}
							{handleAdminNavebar("Users", users)} */}
						</>
					}

					{/* User portal nav menus */}
					{/* {currentUser.user_role === "USER" && (
            <>
              <div className="pb-10">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="container mx-auto flex">
                        <button
                          type="button"
                          className="flex buttons-setting"
                          name={portalDashboard}
                          onClick={(event) => handleChange(event)}
                        >
                          <div
                            className={
                              headerValue == portalDashboard ? "selector" : ""
                            }
                          />
                          <div className="flex pl-5"></div>
                          <div
                            className={
                              headerValue == portalDashboard
                                ? "merchant-info hovercursor enabled"
                                : "merchant-info hovercursor"
                            }
                          ></div>
                          <h1
                            className={`
                        px-1 mx-5 bg-white text-lg text-black-300 whitespace-nowrap navFont
                      `}
                          >
                            Dashboard
                          </h1>
                        </button>
                        <ChevronDownIcon
                          className={`${open ? "transform rotate-180" : ""
                            } w-6 h-6 text-grey-500 ml-auto mx-1`}
                        />
                      </Disclosure.Button>
                      {open &&
                        openSideBar &&
                        handleDashboardPages("Dashboard", portalDashboard)}
                    </>
                  )}
                </Disclosure>
              </div>
            </>
          )} */}

					<div className="pb-10">
						<button
							type="button"
							className="flex buttons-setting"
							name="LOGOUT"
							onClick={() => handleLogout()}
						>
							<div className={headerValue == "LOGOUT" ? "selector" : ""} />
							<div className="flex pl-5"></div>
							<div
								className={
									headerValue == "LOGOUT"
										? "logout hovercursor enabled"
										: "logout hovercursor"
								}
							></div>
							<h1
								className={`px-1 mx-5 bg-white  text-lg text-black-300 whitespace-nowrap navFont ${headerValue == "LOGOUT" ? "textEnabled" : "text-black-300"
									}`}
							>
								Logout
							</h1>
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};
