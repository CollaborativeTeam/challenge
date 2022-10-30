import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
	const [transactionData, setTransactionData] = useState({});
	const [addressData, setAddressData] = useState({});

	return (
		<AddressContext.Provider
			value={{
				addressData,
				setAddressData,
				transactionData,
				setTransactionData
			}}
		>
			{children}
		</AddressContext.Provider>
	);
};

export const useAddressContext = () => {
	const context = useContext(AddressContext);

	if (!context) throw new Error("Address context is not defined here!!");

	return context;
};
