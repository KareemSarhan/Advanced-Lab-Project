import React, { Component } from 'react';
import { Button,Modal,Form, Dropdown,Accordion,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Replacementreq from './sendreplacementreq.component';
import SlotLinkreq from "./sendslotlinkreq.component";
import DayOffreq from "./changedayoffreq.component";
import Leavereq from "./sendleavereq.component";
import axios from "axios";

export default class AcademicMemberPage extends Component {

    constructor(props) {
        super(props);
    
       // history = useHistory();
        this.state = {members: ""};
       
      }
    componentDidMount(){
        axios.get('/AM/GetType')
        .then(response=>{
            //console.log(this.props.history);
            this.setState( {members: response.data});
                //console.log(response.data);  
                // if (response.data == "HeadOfDepartment") {
				// 	this.props.history.push("/Menu");
				// }
        })
        .catch(error=>{
            console.log(error);
        } )
    }

render(){
    return(
      <div>
      <div>

      <Accordion>
          <Card>
              <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                 Schedule
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Link to="/schedule" className="navbar-brand"><button type="button" class="btn btn-dark">View Schedule</button></Link> 
                  {/* <UpdateLocation/><br/>
                  <DeleteLocation/><br/> */}
              </Card.Body>
              </Accordion.Collapse>
          </Card>
          <Card>
              <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                 View Requests 
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
              <Card.Body>
              <Link to="/viewallReq" className="navbar-brand"><button type="button" class="btn btn-dark"> View All Requests</button></Link> <br/>
              <Link to="/replacementrequest" className="navbar-brand"><button type="button" class="btn btn-dark">View Replacement Request</button></Link> <br/>
              <Replacementreq/> <br/>
              </Card.Body>
              </Accordion.Collapse>
          </Card>
          <Card>
              <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Slot Link
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
              <Card.Body>
              <SlotLinkreq/><br/>
              </Card.Body>
              </Accordion.Collapse>
          </Card>
          <Card>
              <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                 Day OFF
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
              <Card.Body>
              <DayOffreq/><br/>
              </Card.Body>
              </Accordion.Collapse>
          </Card>
          <Card>
              <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Leave Request
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
              <Card.Body>
              <Leavereq/><br/>
              </Card.Body>
              </Accordion.Collapse>
          </Card>
          </Accordion>
      </div>
      </div>
    )
};
}
