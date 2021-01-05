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


const useStyles = makeStyles({
  table: {
    minWidth: 330
  }
});

export default class ViewPofile2 extends Component {
  constructor(props) {
    super(props);
    this.state = {members: []};
  }
  componentDidMount() {
    axios.get('/Member/viewAllAttendance')
      .then(res => {
       this.setState( {members: res.data})
       console.log(this.state.members)
     
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render(){
  

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
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
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date </TableCell>
                      <TableCell align="center">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    {
            this.state.members.map((members)=>            
                      <TableCell component="th" scope="row">
                    {members.signIn}
                      </TableCell>
                      )
            }

                      <TableCell align="right">asdasd</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
            <TableCell align="right">
              {" "}
              <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date </TableCell>
                      <TableCell align="center">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        heeeh
                      </TableCell>
                      <TableCell align="right">asdasd</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
            <TableCell align="right">
              {" "}
              <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Hours</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        heeeh
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

}
