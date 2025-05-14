import React, { useEffect, useState, useContext } from "react";
import Notifications, { notify } from "react-notify-toast";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { UserFilter } from "../../components/Filter";
import { Pagination } from "../../components/Pagination";
import * as api from "../../APIUtils";
import { AuthContext } from "../../Auth";
import { userHeader } from "../../components/table/tableHeader";
import { Loader } from "../../components/Loader";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const Users = () => {
    const { confirm } = Modal;
    const [users, setUsers] = useState([]);
    const [searchBy, setSearchBy] = useState("email");
    const { currentUser } = useContext(AuthContext);
    const userRole = currentUser?.role_info?.role;
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openUpdateUserUserModal, setOpenUpdateUserUserModal] = useState(false);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
    });
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("DESC");
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});

    const handleTableData = (request) => {
        setLoading(true);
        api
            .getUsers(request)
            .then((response) => {
                if (response.data.status === 200) {
                    setUsers(response.data.data);
                    setPagination({
                        pageNumber: request.pagination.pageNumber,
                        pageSize: request.pagination.pageSize,
                        totalCount: response.data.total_count,
                    });
                }
            })
            .catch(() => {
                notify.show("Error while fetching users ", "error", 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const request = {
            pagination,
            [searchBy]: search,
        };
        handleTableData(request);
    }, []);

    const handlePagination = (pagination) => {
        const request = {
            pagination,
            [searchBy]: search,
        };
        handleTableData(request);
    };

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        const request = {
            pagination,
            [searchBy]: searchTerm,
        };
        handleTableData(request);
    };

    useEffect(() => {
        if (search === "") handleSearch();
    }, [searchBy]);

    const refreshData = () => {
        const request = {
            pagination,
            [searchBy]: search,
        };
        handleTableData(request);
    };

    const handleSort = (value) => {
        if (sort !== value) {
            let sortedUserList;
            if (value === "ASC") {
                sortedUserList = users.sort((a, b) =>
                    a.createdAt
                        ?.split("/")
                        .reverse()
                        .join()
                        .localeCompare(b.createdAt?.split("/").reverse().join()),
                );
            } else {
                sortedUserList = users
                    .sort((a, b) =>
                        a.createdAt
                            ?.split("/")
                            .reverse()
                            .join()
                            .localeCompare(b.createdAt?.split("/").reverse().join()),
                    )
                    .reverse();
            }
            const reveresedUserList = sortedUserList;
            setUsers([...reveresedUserList]);
            setSort(value);
        }
    };

    const getTableData = (value) => (
        <td className="px-6 py-6 border-gray-200 text-left text-gray-500  tracking-wider whitespace-nowrap ">
            <div className="text-sm text-gray-500">{value ? value : "-"}</div>
        </td>
    );
    const updateUser = (data) => {
        const request = {
            active: !data?.active,
        };
        api
            .updateUserDetails(data?.id, request)
            .then((response) => {
                if (response.data.status === 200) {
                    refreshData();
                }
            })
            .catch(() => {
                notify.show("Error while deactivate user ", "error", 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const confirmModal = (data) => {
        const message = `Are you sure you want to ${data?.active ? "disable" : "enable"
            } this user ?`;
        confirm({
            title: "Warning",
            icon: <ExclamationCircleFilled />,
            centered: true,
            content: message,
            okText: "Yes",

            onOk() {
                updateUser(data);
            },
            onCancel() { },
        });
    };

    return (
        <div className="overflow-hidden ml-8">
            <Notifications />
            <div className="tracking-wider">
                <Navbar />
                {openAddUserModal && (
                    <AddNewUser
                        openModal={openAddUserModal}
                        closeModal={() => setOpenAddUserModal(false)}
                        refresh={() => refreshData()}
                    />
                )}
                {openUpdateUserUserModal && (
                    <UpdateUserRole
                        openModal={openUpdateUserUserModal}
                        userDetails={userDetails}
                        closeModal={() => setOpenUpdateUserUserModal(false)}
                        refresh={() => refreshData()}
                    />
                )}
                <div className="flex flex-col w-.95 h-screen ml-8">
                    <Header onChange={(searchTerm) => handleSearch(searchTerm)} />
                    <div className="flex flex-row ">
                        <div className="flex-grow">
                            <UserFilter
                                totalCount={pagination.totalCount}
                                pageUserListCount={users.length}
                                onSearchTypeChange={(value) => setSearchBy(value)}
                                onSearch={(searchTerm) => handleSearch(searchTerm)}
                            />
                        </div>
                        {userRole === "ADMIN" ? (
                            <div className=" justify-end">
                                <button
                                    className="m-6 px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={() => setOpenAddUserModal(true)}
                                >
                                    Add User
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block w-screen sm:px-6 flex justify-center lg:px-4">
                            <div className="shadow w-screen p-8 overflow-hidden  sm:rounded-lg">
                                <div className="overflow-x-auto">
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <div className="w-full table-height  overflow-y-auto table-container">
                                            <table className="w-full p-8">
                                                <thead>
                                                    <tr className="table-header">
                                                        {userHeader()}
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium text-gray-500 whitespace-nowrap"
                                                        >
                                                            <div className="flex flex-row">
                                                                <div className="mt-3 "> CREATED AT</div>

                                                                <div className="flex flex-col ml-3">
                                                                    <div>
                                                                        <ChevronUpIcon
                                                                            className="h-5 w-5 hover:text-blue-400"
                                                                            onClick={() => handleSort("ASC")}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <ChevronDownIcon
                                                                            className="h-5 w-5 hover:text-blue-400"
                                                                            onClick={() => handleSort("DESC")}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium text-gray-500 whitespace-nowrap"
                                                        >
                                                            <div className="flex flex-row">
                                                                <div className="mt-3"> </div>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white ">
                                                    {users.map((data) => (
                                                        <tr
                                                            className="box-content border-gray-50 border-4 h-2"
                                                            key={data.id}
                                                        >
                                                            {getTableData(data.email)}
                                                            {getTableData(data.role_info?.role)}
                                                            {getTableData(data.phone)}
                                                            {getTableData(data.created_at)}
                                                            {userRole === "ADMIN" ? (
                                                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button
                                                                        type="button"
                                                                        className={`${data?.active
                                                                                ? "bg-red-400"
                                                                                : "bg-green-400"
                                                                            } rounded-lg text-white p-2 px-4 mr-4 w-24`}
                                                                        onClick={() => {
                                                                            confirmModal(data);
                                                                        }}
                                                                    >
                                                                        {data?.active ? "Disable" : "Enable"}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="rounded-lg bg-blue-600 text-white p-2 px-4"
                                                                        onClick={() => {
                                                                            setOpenUpdateUserUserModal(true);
                                                                            setUserDetails(data);
                                                                        }}
                                                                    >
                                                                        Update Role
                                                                    </button>
                                                                </td>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    <Pagination
                                        pagination={pagination}
                                        onChangePage={(paginate) => handlePagination(paginate)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
