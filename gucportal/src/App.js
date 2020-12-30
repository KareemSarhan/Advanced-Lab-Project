import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header';
import Login from './components/pages/LoginModal';




class App extends Component {
  render(){
  return (
      <div className="app">
        <Header />
        <Login />
      </div>
  );
}
}
export default App;
