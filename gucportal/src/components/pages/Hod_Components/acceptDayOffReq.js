import axios from 'axios';
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class acceptDayOffReq extends Component {
    constructor(props){
    super(props)
    const { params } = this.props.location.pathname.substring(17);
        
console.log(this.props.location.pathname.substring(17))
        axios.put('/Hod/acceptDayOffReq/'+this.props.location.pathname.substring(17))
            .then(
              res =>
              { console.log("success")
              swal(res.data.msg)
            }).
            catch((err) =>
            {
              {swal(err.response.data.errmsg || err.response.data.err)}
              console.log(err.message)
              console.log("Feeeeeeee errorrrrrrrr"+err.message)
            })
    //}
   
}
// function name(params) {
    
// }


render() {
  
   return (
     <div>
          {/*  <div class="alert alert-warning alert-dismissible fade show" role="alert"> */}
        {/* <strong>Request Accepted Successfully!!</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
        {/* <viewDayOffReq/> */}
        <Link to= '/viewDayOffReq'> Day Off Requests </Link >
          </div>
  )
}
}

export default acceptDayOffReq
