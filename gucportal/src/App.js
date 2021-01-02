import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Header from './components/layout/Header';
import Login from './components/pages/LoginModal';
import AddLocation from './components/pages/HR_Components/AddLocationModal';
import DeleteLocation from './components/pages/HR_Components/DeleteLocationModal';
import UpdateLocation from './components/pages/HR_Components/UpdateLocationModal';
import AddFaculty from './components/pages/HR_Components/AddFacultyModal';
import UpdateFaculty from './components/pages/HR_Components/UpdateFacultyModal';
import DeleteFaculty from './components/pages/HR_Components/DeleteFacultyModal';
import AddDepartment from './components/pages/HR_Components/AddDepartmentModal';
import UpdateDepartment from './components/pages/HR_Components/UpdateDepartmentModal';
import DeleteDepartment from './components/pages/HR_Components/DeleteDepartmentModal';
import AddCourse from './components/pages/HR_Components/AddCourseModal';
import UpdateCourse from './components/pages/HR_Components/UpdateCourseModal';
import DeleteCourse from './components/pages/HR_Components/DeleteCourseModal';
import ViewProfile from './components/pages/viewProfile'
import updateProfile from './components/pages/UpdateProfile'
import ViewAllAttendance from './components/pages/Attendance'


class App extends Component {
  render(){
  return (
    <div>
      <div className="app">
        <Header /><br/>
        <br/>
        <br/>
        
      </div>

       <Router>
      <div >
      <Switch>
      <Route path="/viewProfile" exact component={ViewProfile} />
      <Route path="/" exact component={Login} />
      <Route path="/viewAllAttendance" exact component={ViewAllAttendance} />

      </Switch>

      </div>
    </Router>
    </div>
      
    
  );
}
}

export default App;