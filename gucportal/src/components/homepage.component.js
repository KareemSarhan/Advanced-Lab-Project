import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends Component {
    render() {
        return (
            <div>

        
<Link to="/schedule" className="navbar-brand"><button type="button" class="btn btn-dark">View Schedule</button></Link> 
<br/>
<br/>
<Link to="/replacementrequest" className="navbar-brand"><button type="button" class="btn btn-dark">View Replacement Request</button></Link> 
<br/>
<br/>
<Link to="/sendrepreq" className="navbar-brand"><button type="button" class="btn btn-dark"> Replacement Request</button></Link> 
<br/>
<br/>
<Link to="/senddayoffreq" className="navbar-brand"><button type="button" class="btn btn-dark">Change Day Off Request</button></Link> 
<br/>
<br/>
<Link to="/sendslotLinkreq" className="navbar-brand"><button type="button" class="btn btn-dark"> Slot Link Request</button></Link> 
<br/>
<br/>
<Link to="/sendleavereq" className="navbar-brand"><button type="button" class="btn btn-dark"> Leave Request</button></Link> 
<br/>
<br/>

</div>  

            );
  }
}