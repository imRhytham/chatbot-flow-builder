import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReactFlowProvider } from "reactflow";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactFlowProvider>
				<App />
			</ReactFlowProvider>
		</Provider>
	</React.StrictMode>
);
