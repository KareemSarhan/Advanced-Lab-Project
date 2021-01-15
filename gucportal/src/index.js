import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./components/layout/Header.js";
import axios from "axios";
require("dotenv").config();

//import 'bootstrap/dist/css/bootstrap.min.css';
//import reportWebVitals from './reportWebVitals';
const baseUrl = process.env.baseURL || "http://localhost:5000";

axios.defaults.baseURL = baseUrl + "/";
axios.defaults.headers.common["authtoken"] = localStorage.getItem("authtoken");

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
