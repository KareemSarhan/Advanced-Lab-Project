import React, { Component, useState, history, useHistory } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import {Link, Router, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Spinner from "react-bootstrap/Spinner";


function AttendenceByMonth(props) {
    const [show, setShow] = useState(true);
    const [month, setMonth] = useState("january");
    const [WantedData, setWantedData] = useState([]);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCourse = (e) => setCourse(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            month: month
        };
        console.log("sabah el fol " + mem.month)
        axios.get('/Member/viewAttendanceByMonth/'+ mem.month)
        .then(res => {
          console.log(res.data);
          setWantedData(res.data.WantedRecords);
    })
    .catch((err) => console.log(err))
}
     
if (WantedData == null) {
  return (
      <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
      </Spinner>
  );
} else
  
    return (
      <div>
       <Form.Group controlId="formBasicType" required>
                <Form.Label>Choose a month</Form.Label><br/>
                  <Form.Control as="select" onChange={(e)=> setMonth(e.currentTarget.value)
                  }>
                    <option value="January">January</option>
                    <option value= "February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value= "June">June</option>
                    <option value="July">July</option>
                    <option value="Augest">Augest</option>
                    <option value= "September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>

            <TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Signin </TableCell>
							<TableCell align="center">Signout</TableCell>
							<TableCell align="center">Duration</TableCell>
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
												<TableCell align="center">Time</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{/* shofy kda da hay3ml eh  */}
                      {WantedData.map((members) => (
												members.signIn?
												<TableRow>
													<TableCell component="th" scope="row" align="center">
														{members.signIn.substring(0,10)}
													</TableCell>
													<TableCell component="th" scope="row" align="center">
														{members.signIn.substring(11,16)}
													</TableCell>
												</TableRow>
												:<TableRow>
													<TableCell component="th" scope="row" align="right">
													{"You did not sign In that day !"}
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
											{WantedData.map((members) => (
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
											
											{WantedData.map((members) => (
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
  
 export default  withRouter(AttendenceByMonth)