import { property, users, customers, rolepermission } from "../../data/tableHeaderName";

export const propertiesHeader = () =>
	property.map((data) => (
		<th
			key={data.name}
			scope="col"
			className="px-6 py-6 border-gray-200 text-left text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap"
		>
			{data.name}
		</th>
	));

export const userHeader = () =>
	users.map((data) => (
		<th
			key={data.name}
			scope="col"
			className="px-6 py-6 border-gray-200 text-left text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap"
		>
			{data.name}
		</th>
	));
export const RolePermission = () =>
	rolepermission.map((data) => (
		<th
			key={data.name}
			scope="col"
			className="px-6 py-6 border-gray-200 text-left text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap"
		>
			{data.name}
		</th>
	));

RolePermission

export const customersHeader = () =>
	customers.map((data) => (
		<th
			key={data.name}
			scope="col"
			className="px-6 py-6 border-gray-200 text-left text-xs font-medium text-gray-500  tracking-wider whitespace-nowrap"
		>
			{data.name}
		</th>
	));
