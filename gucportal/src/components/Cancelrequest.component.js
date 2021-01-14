import axios from 'axios';
import React, { Component } from 'react'

 class Cancelreq extends Component {  
    constructor(props){
    super(props)
    //const { params } = this.props.location.pathname.substring(2);
        

    const x={requestID:this.props.location.pathname.substring(15)};
    console.log(x)
    
    axios.delete('/AM/cancelReq', { data: x })
    .then(
        res =>
        { console.log("success" )
        swal(res.data.msg)
      })
      .catch((err) => {swal(err.response.data.errmsg || err.response.data.err)});
}


render() {
    return (
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {/* <strong>Request Cancelled Successfully!!</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
    )
}
}

export default Cancelreq