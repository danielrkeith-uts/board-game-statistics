import { createContext, useState, type ReactNode } from 'react';

interface AlertContextProviderProps {
	children: ReactNode;
}

interface AlertContextType {
	success: string | null;
	setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
	error: string | null;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AlertContext = createContext<AlertContextType>({
	success: null,
	setSuccess: () => {},
	error: null,
	setError: () => {},
});

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const contextValue: AlertContextType = {
		success,
		setSuccess,
		error,
		setError,
	};

	return (
		<AlertContext.Provider value={contextValue}>
			{children}
		</AlertContext.Provider>
	);
};

export { AlertContext, AlertContextProvider };
