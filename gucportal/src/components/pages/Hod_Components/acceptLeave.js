import axios from 'axios';
import React, { Component } from 'react'

export class acceptLeave extends Component {  
    constructor(props){
    super(props)
    const { params } = this.props.location.pathname.substring(16);
        
console.log(this.props.location.pathname.substring(16))
        axios.put('/Hod/acceptLeaveReq/'+this.props.location.pathname.substring(16))
            .then(
              res =>
              { console.log("success")
            },
            err =>
            {
              console.log("Feeeeeeee errorrrrrrrr"+err)
            })
    //}
   
}
// function name(params) {
    
// }


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

export default acceptLeave
