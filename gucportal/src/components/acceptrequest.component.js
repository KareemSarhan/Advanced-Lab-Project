import axios from 'axios';
import React, { Component } from 'react'

export class acceptreq extends Component {  
    constructor(props){
    super(props)
   // const { params } = this.props.requestID.pathname.substring(2);
        
console.log(this.props.location.pathname.substring(15))

const x={requestID:this.props.location.pathname.substring(15)};

        axios.post('/AM/AcceptReq',x)
            .then(
              res =>
              { console.log("success" )
            },
            err =>
            {
              console.log("Feeeeeeee errorrrrrrrr"+err)
            })
    //}
   
}


render() {
    return (
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Request Accepted Successfully!!</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
}
}

export default acceptreq