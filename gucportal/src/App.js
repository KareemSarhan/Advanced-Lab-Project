import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/layout/Header';
import viewProfile from './components/pages/viewProfile';



function App() {
  return (
    <Router>
      <div >
      <Header />
      <br/>
      <Route path="/Members/viewProfile" exact component={viewProfile} />
      {/* <Route path="/attendance" component={Attendance} />
      <Route path="/logout" component={Logout} /> */}
      </div>
    </Router>
    
  );
}

export default App;