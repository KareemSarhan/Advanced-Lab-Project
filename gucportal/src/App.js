import './App.css';
import React ,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header';
import Login from './components/pages/LoginModal';
import HRPage from './components/pages/HR_Components/HRPage';
import {BrowserRouter as Router,Route} from "react-router-dom" 
import Navbar from "./components/navbar.component";
import Notification from "./components/notification.component";
import Schedule from "./components/schedule.component";
import Home from "./components/homepage.component";
import ReplacementRequest from "./components/replacementrequest.component";
import Menu from './components/layout/Menu';
import viewMembers from './components/pages/Hod_Components/viewMembers';
import viewLeaveRequests from './components/pages/Hod_Components/viewLeaveRequests'
import viewSickLeaves from './components/pages/Hod_Components/viewSickLeaves'
import viewAccidentalLeaves from './components/pages/Hod_Components/viewAccidentalLeaves'
import {Link} from 'react-router-dom'
import viewAnnualLeaves from './components/pages/Hod_Components/viewAnnualLeaves';
import viewCompensationLeaves from './components/pages/Hod_Components/viewCompensationLeaves';
import viewMaternityLeaves from './components/pages/Hod_Components/viewMaternityLeaves'
import viewCoverage from './components/pages/Hod_Components/viewCoverage'
import viewDaysOffAll from './components/pages/Hod_Components/viewDaysOffAll';
import viewDayOffReq from './components/pages/Hod_Components/viewDayOffReq'



class App extends Component {
  render(){
  return (
    <div>
      <div className="app">
        <Header /><br/><br/>  
        
       <Router>
       <Link to="/Menu" className="navbar-brand">Menu</Link>
        <Route path="/Menu" exact component={Menu}/>
      <Route path="/viewMembers"  exact component={viewMembers}/>
      <Route path="/viewLeaveReq"  component={viewLeaveRequests}/>
      <Route path="/SickLeaves"  component={viewSickLeaves}/>
      <Route path="/AccidentalLeaves"  component={viewAccidentalLeaves}/>
      <Route path="/AnnualLeaves"  component={viewAnnualLeaves}/>
      <Route path="/CompensationLeaves"  component={viewCompensationLeaves}/>
      <Route path="/MaternityLeaves"  component={viewMaternityLeaves}/>
      <Route path="/viewCoverage"  component={viewCoverage}/>
      <Route path="/viewDaysOffAll"  component={viewDaysOffAll}/>
      <Route path="/viewDayOffReq"  component={viewDayOffReq}/>
      </Router>
        <br/>
        <br/>
        
        <Router>
       
      <div className="container">
      <Navbar />
<br/>
      <Route path="/" component={Login} /> 
      <Route path="/Hr" component={HRPage} />
      <Route path="/notification" component={Notification} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/homepage" component={Home} />
      <Route path="/replacementrequest" component={ReplacementRequest} />
     
     
      {/* <Link href= "/Menu" class="nav-link" >Menu</Link> */}
    </div>
    </Router>
      </div>
    </div>
      
    
  );
}
}

export default App;