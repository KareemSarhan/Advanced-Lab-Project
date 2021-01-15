import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import RejectslotLinkReq from "./RejectSlotLinkingReq";

var x;
export class ViewSlotLinkingReq extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		axios
			.get("CC/viewSlotLinkReq", {
				headers: { authtoken: localStorage.getItem("authtoken") },
			})
			.then((res) => {
				this.setState(res.data);
				console.log(this.state.SLslotsReq);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		if (this.state == null) {
			return (
				<div>
					<h1>Loading..</h1>
				</div>
			);
		} else
			return (
				<div>
					<h3
						style={{
							marginLeft: "15px",
						}}>
						My Slot Linking Request
					</h3>
					<table
						className="table"
						style={{
							marginLeft: "15px",
						}}>
						<thead className="thead-light">
							<tr>
								<th>Request ID</th>
								<th>Member</th>
								<th>Course Name</th>
								<th> Slot timing </th>
								<th> Status </th>
								<th> Action </th>
							</tr>
						</thead>
						<tbody>
							<td>
								{this.state.SLslotsReq.map((member) => (
									<div>{member.requestID}</div>
								))}
							</td>
							<td>
								{this.state.SLslotsReq.map((member) => (
									<div>{member.memberID.Memberid.id}</div>
								))}
							</td>
							<td>
								{this.state.SLslotsReq.map((member) => (
									<div>{member.courseID.name}</div>
								))}
							</td>
							<td>
								{this.state.SLslotsReq.map((member) => (
									<div>{member.requestedSlot.timing}</div>
								))}
							</td>
							<td>
								{this.state.SLslotsReq.map((member) => (
									<div>{member.status}</div>
								))}
							</td>
							<td>
								{this.state.SLslotsReq.map((member) => (
									<dev>
										<Link to={"/AcceptSlotLReq/" + member.requestID}>
											Accept
										</Link>
										|
										<Link to={"/RejectSlotLReq/" + member.memberID.Memberid.id}>
											Reject
										</Link>
									</dev>
								))}
							</td>
						</tbody>
					</table>
				</div>
			);
	}
}

export default ViewSlotLinkingReq;
