import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header';
import SideMenu from './components/layout/SideMenu';
import Login from './components/pages/LoginModal';
import AddLocation from './components/pages/AddLocationModal';
import DeleteLocation from './components/pages/DeleteLocationModal';
import UpdateLocation from './components/pages/UpdateLocationModal';
import AddFaculty from './components/pages/AddFacultyModal';
import UpdateFaculty from './components/pages/UpdateFacultyModal';


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
      </div>
  );
}
}
export default App;
