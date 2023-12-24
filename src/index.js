import "./index.css";

import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import rotateGradient from "./scripts/gradient.js";

rotateGradient();

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
