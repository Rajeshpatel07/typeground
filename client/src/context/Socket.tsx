import { createContext, useContext, useEffect, useState } from "react";

interface ContextInterface {
	socket: WebSocket | null;
}

const SocketContext = createContext<ContextInterface | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const webSocket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
		setSocket(webSocket);

		return () => {
			webSocket.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (!context || context === null) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};
