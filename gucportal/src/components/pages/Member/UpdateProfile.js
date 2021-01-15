import React, { Component, useState } from "react";
import {
	Button,
	Collapse,
	Nav,
	Navbar,
	NavDropdown,
	NavbarBrand,
	NavLink,
	Container,
	Form,
	FormControl,
	Card,
	Modal,
} from "react-bootstrap";
import swal from "sweetalert";

import axios from "axios";

function UpdatePro() {
	const [show, setShow] = useState(false);
	const [NewSecondaryEmail, setNewSecondaryEmail] = useState("");
	const [NewPhonenumber, setPhonenumber] = useState("");
	const [NewOfficehours, setNewOffice] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleNewSecondaryEmail = (e) => setNewSecondaryEmail(e.target.value);
	const handleNewPhonenumber = (e) => setPhonenumber(e.target.value);
	const handleNewOfficehours = (e) => setNewOffice(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		const mem = {
			NewSecondaryEmail: NewSecondaryEmail,
			NewPhonenumber: NewPhonenumber,
			NewOfficehours: NewOfficehours,
		};
		//  console.log(mem);
		axios
			.post("/Member/updateProfile", mem)
			.then((res) => {
				swal(res.data.msg);
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
		handleClose();
	};

	return (
		<div>
			<NavDropdown.Item variant="primary" onClick={handleShow}>
				Update Profile
			</NavDropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header>
					<Modal.Title>Update Your Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicEmail" required>
							<Form.Label>New Secondary Email</Form.Label>
							<Form.Control
								type="NewSecondaryEmail"
								placeholder="Enter a Secondary email"
								onChange={handleNewSecondaryEmail}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword" required>
							<Form.Label>New Phonenumber</Form.Label>
							<Form.Control
								type="NewPhonenumber"
								placeholder="Enter a Phone number "
								onChange={handleNewPhonenumber}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword" required>
							<Form.Label> New Officehours</Form.Label>
							<Form.Control
								type="NewPhonenumber"
								placeholder="Enter an  Office hours timing "
								onChange={handleNewOfficehours}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={handleSubmit}>
							Submit
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
}

class UpdateProfile extends Component {
	render() {
		return (
			<div>
				<UpdatePro />
			</div>
		);
	}
}
export default UpdateProfile;

