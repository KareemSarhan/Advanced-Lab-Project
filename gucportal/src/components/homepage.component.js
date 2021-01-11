import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Replacementreq from './sendreplacementreq.component';
import SlotLinkreq from "./sendslotlinkreq.component";
import DayOffreq from "./changedayoffreq.component";
import Leavereq from "./sendleavereq.component";

export default class Home extends Component {
    render() {
        return (
            <div>

        
<Link to="/schedule" className="navbar-brand"><button type="button" class="btn btn-dark">View Schedule</button></Link> 
<br/>
<br/>
<Link to="/viewallReq" className="navbar-brand"><button type="button" class="btn btn-dark"> View All Requests</button></Link> 
<br/>
<br/>
<Link to="/replacementrequest" className="navbar-brand"><button type="button" class="btn btn-dark">View Replacement Request</button></Link> 
<br/>
<br/>
{/* <Link to="/sendreplacementreq" className="navbar-brand"><button type="button" class="btn btn-dark"> Add Replacement Request</button></Link>  */}
<Replacementreq/>

<br/>
{/* <Link to="/sendslotLinkreq" className="navbar-brand"><button type="button" class="btn btn-dark"> Slot Link Request</button></Link>  */}

<SlotLinkreq/>

<br/>
<DayOffreq/>
{/* <Link to="/senddayoffreq" className="navbar-brand"><button type="button" class="btn btn-dark">Change Day Off Request</button></Link>  */}
<br/>

{/* <Link to="/sendleavereq" className="navbar-brand"><button type="button" class="btn btn-dark"> Leave Request</button></Link>  */}

<Leavereq/>

<br/>

</div>  

            );
  }
}