import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import ViewAttendanceByMonth from './AttendanceByMonth';

const useStyles = makeStyles({
	table: {
		minWidth: 330,
	},
});

export default class ViewMissingDays2 extends Component {
	constructor(props) {
		super(props);
		this.state = { members: [] };
	}
 componentDidMount() {
    axios.get('Member/viewMissingDays',{headers:{"authtoken":localStorage.getItem("authtoken")}})
      .then(res => {
        this.setState(res.data);
        console.log(this.state.TheAbsentDays)


      })
      .catch((error) => {
        console.log(error);
      })
  
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
				<div>
					
				</div>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Signin </TableCell>
							
							
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								<TableContainer component={Paper}>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell align="center">Date </TableCell>
											
											</TableRow>
										</TableHead>
										<TableBody>
											{/* shofy kda da hay3ml eh  */}
											{this.state.members.map((day) => (
												<TableRow>
													<TableCell component="th" scope="row" align="center">
                                                    {day.i.substring(8,16)}
													</TableCell>
													
												</TableRow>
											))}

										</TableBody>

										
										
									</Table>
								</TableContainer>
							</TableCell>
							<TableCell align="right">
								{" "}
								<TableContainer component={Paper}>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell align="center">Date </TableCell>
												<TableCell align="center">Time</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{/* shofy kda da hay3ml eh  */}
											{this.state.members.map((members) => (
												members.signOut?
												<TableRow>
													<TableCell component="th" scope="row" align="center">
														{members.signOut.substring(0,10)}
													</TableCell>
													<TableCell component="th" scope="row" align="center">
														{members.signOut.substring(11,16)}
													</TableCell>
												</TableRow>
												:<TableRow>
													<TableCell component="th" scope="row" align="right">
													{"You did not sign Out that day !"}
													</TableCell>
													
												</TableRow>
											))}

										</TableBody>
									</Table>
								</TableContainer>
							</TableCell>
							<TableCell align="right">
								{" "}
								<TableContainer component={Paper}>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell align="center">Hours</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											
											{this.state.members.map((members) => (
												<TableRow>
													<TableCell component="th" scope="row" align="center">
														{members.duration}
													</TableCell>
													
												</TableRow>
											))}
											
										</TableBody>
									</Table>
								</TableContainer>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			</div>
		);
	}
}
