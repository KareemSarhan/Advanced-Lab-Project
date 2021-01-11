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
	const [SlotMember, setSlotMember] = useState("");
	const [SlotTiming, setSlotTiming] = useState("");
    const [NewTiming, setNewTiming] = useState("");
    const [NewLocation, setNewLocation] = useState("");


	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSlotMember = (e) => setSlotMember(e.target.value);
	const handleSlotTiming = (e) => setSlotTiming(e.target.value);
    const handleNewTiming = (e) => setNewTiming(e.target.value);
    const handleNewLocation = (e) => setNewLocation(e.target.value);


	const handleSubmit = (e) => {
		e.preventDefault();
		const mem = {
             SlotMember :SlotMember,
             SlotTiming :SlotTiming,
             NewTiming :NewTiming,
             NewLocation :NewLocation
	};
		//  console.log(mem);
		axios
			.post("/CC/updateSlot", mem)
			.then((res) => {
				swal(res.data.msg);
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
		handleClose();
	};

	return (
		<div>
			<NavDropdown.Item variant="primary" onClick={handleShow}>
				Update Slot
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
					<Modal.Title>Update Slot</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicEmail" required>
							<Form.Label>MemberID teachinng the wanted to be updated slot </Form.Label>
							<Form.Control
								type="Member"
								placeholder="MemberID teachinng the wanted to be updated slot."
								onChange={handleSlotMember}
							/>
						</Form.Group>

						<Form.Group controlId="Slot timing" required>
							<Form.Label>Enter the old slot timing </Form.Label>
							<Form.Control
								type="NewPhonenumber"
								placeholder="Enter a Phone number "
								onChange={handleSlotTiming}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword" required>
							<Form.Label> New Slot timing.</Form.Label>
							<Form.Control
								type="NewPhonenumber"
								placeholder="Enter a new slot timing."
								onChange={handleNewTiming}
							/>
						</Form.Group>
                        <Form.Group controlId="formBasicPassword" required>
							<Form.Label> New Location of the slot .</Form.Label>
							<Form.Control
								type="NewLocation"
								placeholder="Enter a new Location for a slot "
								onChange={handleNewLocation}
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

