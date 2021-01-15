import axios from "axios";
import React, { Component } from "react";
import { useHistory } from "react-router-dom";
export class AcceptSLotReq extends Component {
	constructor(props) {
		super(props);
		//const { params } = this.props.location.pathname.substring(16);
		let data = { RequestID: this.props.location.pathname.substring(16) };

		axios.post("/CC/AcceptSlotLinkReq/", data).then(
			(res) => {
				console.log("success" + res.data);
				//swal(res.data);
			},
			(err) => {
				//	swal(err);
				console.log("Feeeeeeee errorrrrrrrr" + err);
			}
		);
		//}
	}
	// function name(params) {

	// }

	render() {
		return (
			<div class="alert alert-warning alert-dismissible fade show" role="alert">
				<button
					type="button"
					class="close"
					data-dismiss="alert"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);
	}
}

export default AcceptSLotReq;
