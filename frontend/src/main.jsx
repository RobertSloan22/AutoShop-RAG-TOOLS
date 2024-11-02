import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { VehicleProvider } from "./context/VehicleContext.jsx";
import { InvoiceProvider } from "./context/InvoiceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<SocketContextProvider>
					<CustomerProvider>
						<VehicleProvider>
							<InvoiceProvider>
								<App />
							</InvoiceProvider>
						</VehicleProvider>
					</CustomerProvider>
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
