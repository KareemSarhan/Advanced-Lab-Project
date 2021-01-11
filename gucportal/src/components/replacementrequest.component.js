import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import acceptr from "./acceptrequest.component";
//import{DropdownButton,Dropdown} from 'react-bootstrap'



export default class replacementrequest extends Component {

    constructor(props) {
        super(props);

     

        this.state = {replacementrequests: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewReplacementReq')
        .then(res=>{
            
                this.setState({replacementrequests:res.data })  
                    
        })
        .catch(error=>{
            console.log(error);
        } )
    }

      render() {
        if(!(this.state.replacementrequests.length)){
          return <div>NO Replacement Requests</div>
        }
        return (
            <div>
        <h3>My Replacement Requests </h3>
  
       
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>RequestID</th>
              <th>RequestedID</th>
              <th>Requested Day</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            <td>
            {
            this.state.replacementrequests.filter((replacementrequests)=>
            {return replacementrequests.RequestID}).map((replacementrequests)=>
            <div>{replacementrequests.RequestID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
           <div>{replacementrequests.RequestedID}</div>
           
           )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.RequestedDay.substring(0,10)}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.RequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.Status}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.comment}</div>
            )
            }
          </td>
          
         
           {
             <td>
             {       
             this.state.replacementrequests.filter((replacementrequests)=>
             {return replacementrequests.RequestID}).map((replacementrequests)=>
             <div>
             <Link to={"/acceptrequest/"+replacementrequests.RequestID  }>Accept</Link> 
              | <Link to={"/Cancelrequest/"+replacementrequests.RequestID}>Cancel</Link>
            
             </div>
             )
             }
             </td>
            
          } 

          </tbody>
        </table>
      </div>


            );
  }
}