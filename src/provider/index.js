import React, { createContext, useState } from "react";

const InitialDataContext = createContext();

const InitialDataProvider = ({ children }) => {
	const [initialData, setInitialData] = useState({});

	const getData = async (key) => initialData[key];

	const setData = (key, value) => {
		const data = initialData;
		data[key] = value;
		setInitialData(data);
	};

	return (
		<InitialDataContext.Provider value={{ getData, setData }}>
			<>{children}</>
		</InitialDataContext.Provider>
	);
};

export { InitialDataProvider, InitialDataContext };
