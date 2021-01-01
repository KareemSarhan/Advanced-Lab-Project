import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
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

class App extends Component {
  render(){
  return (
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
      </div>
    
  );
}
}

export default App;