import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./components/layout/Header.js";
import axios from "axios";
require("dotenv").config();

//import 'bootstrap/dist/css/bootstrap.min.css';
//import reportWebVitals from './reportWebVitals';
// const baseUrl = "https://gucportalmern.herokuapp.com";
// //const baseUrl =  "http://localhost:5000";
// console.log(process.env.baseURL);
// axios.defaults.baseURL = baseUrl + "/";
console.log(localStorage.getItem("authtoken"));
axios.defaults.headers.common["authtoken"] = localStorage.getItem("authtoken");

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
