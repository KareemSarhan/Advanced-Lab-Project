import React, { Component, useState } from 'react'
import { Button,Modal,Form, Dropdown} from 'react-bootstrap'
import AddLocation from './AddLocationModal';
import UpdateLocation from './UpdateLocationModal';
import DeleteLocation from './DeleteLocationModal';


  class LocationAll extends Component{
  render(){
      return(
        <div>
        <div>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Location Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item><AddLocation/></Dropdown.Item>
                <Dropdown.Item><UpdateLocation/></Dropdown.Item>
                <Dropdown.Item><DeleteLocation/></Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
      )
  };
};
export default LocationAll;
