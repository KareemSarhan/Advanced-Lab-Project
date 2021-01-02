

import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import AddHrMember from './components/pages/HR_Components/AddHrMemberModal';
import AddAcademicMember from './components/pages/HR_Components/AddAcademicMemberModal';
import UpdateStaffMember from './components/pages/HR_Components/UpdateStaffMemberModal';
import DeleteStaffMember from './components/pages/HR_Components/DeleteStaffMemberModal';
import AssignHod from './components/pages/HR_Components/AssignHodModal';
import AddSignIn from './components/pages/HR_Components/AddSignInModal';
import AddSignOut from './components/pages/HR_Components/AddSignOutModal';
import UpdateSalary from './components/pages/HR_Components/UpdateSalaryModal';
import ViewMissing from './components/pages/HR_Components/ViewMissing';
import AddSlot from './components/pages/AddSlotModal';

class App extends Component {
  render(){
  return (
    <div>
      <div className="app">
        <Header /><br/>
        <br/>
        <br/>
        <Login /><br/>
        <AddLocation /><br/>
        <UpdateLocation /> <br/>
        <DeleteLocation /><br/>
        <AddFaculty /><br/>
        <UpdateFaculty /><br/>
        <DeleteFaculty /><br/>
        <AddDepartment /><br/>
        <UpdateDepartment /><br/>
        <DeleteDepartment /><br/>
        <AddCourse /><br/>
        <UpdateCourse /><br/>
        <DeleteCourse /><br/>
        <AddHrMember /><br/>
        <AddAcademicMember /><br/>
        <UpdateStaffMember /><br/>
        <DeleteStaffMember /><br/>
        <AssignHod /><br/>
        <AddSignIn /><br/>
        <AddSignOut /><br/>
        <UpdateSalary /><br/>
        
      
      </div>
    </div>
      
    
  );
}
}

export default App;