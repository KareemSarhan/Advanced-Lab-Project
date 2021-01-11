import React, { Component, useState, history } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HRPage from "./HR_Components/HRPage";
import Home from "../homepage.component";

import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";

function LoginModal(props) {
	const [show, setShow] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [memtype, setmemtype] = useState("");
	const history = useHistory();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		const mem = {
			email: email,
			password: password,
		};
		//   console.log(mem);
		axios.post("/Member/login", mem).then(
			(res) => {
				//console.log(res)
				//console.log(res.headers.authtoken)
				localStorage.setItem("authtoken", res.headers.authtoken);

				console.log(res);
				console.log(res.data.membertype);
				setmemtype(res.data.membertype);
				console.log(history);
				if (res.data.membertype == "hr") {
					history.push("/" + res.data.membertype + "");
				} else {
					history.push("/homepage");
				}

				handleClose();
			},
			(err) => {
				console.log("Feeeeeeee errorrrrrrrr" + err);
			}
		);
	};

	return (
		<div>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicEmail" required>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={handleEmail}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword" required>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={handlePassword}
							/>
						</Form.Group>
						<Button variant="primary" type="submit" onClick={handleSubmit}>
							Submit
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
			{memtype == "hr" ? <HRPage /> : null}
			{memtype == "ac" ? <Home /> : null}
		</div>
	);
}

class Login extends Component {
	render() {
		return (
			<div>
				<LoginModal />
			</div>
		);
	}
}
export default Login;
