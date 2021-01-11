import React, { Component, useState } from 'react'
import { Button,Modal,Form, Dropdown,Accordion,Card} from 'react-bootstrap'
import AddLocation from './AddLocationModal';
import DeleteLocation from './DeleteLocationModal';
import UpdateLocation from './UpdateLocationModal';
import AddFaculty from './AddFacultyModal';
import UpdateFaculty from './UpdateFacultyModal';
import DeleteFaculty from './DeleteFacultyModal';
import AddDepartment from './AddDepartmentModal';
import UpdateDepartment from './UpdateDepartmentModal';
import DeleteDepartment from './DeleteDepartmentModal';
import AddCourse from './AddCourseModal';
import UpdateCourse from './UpdateCourseModal';
import DeleteCourse from './DeleteCourseModal';
import AddHrMember from './AddHrMemberModal';
import AddAcademicMember from './AddAcademicMemberModal';
import UpdateStaffMember from './UpdateStaffMemberModal';
import DeleteStaffMember from './DeleteStaffMemberModal';
import AssignHod from './AssignHodModal';
import AddSignIn from './AddSignInModal';
import AddSignOut from './AddSignOutModal';
import UpdateSalary from './UpdateSalaryModal';
import ViewMemAttButtonModal from './ViewMemAttButton';
import AddSlot from '../AddSlotModal';


  class HRPage extends Component{
  render(){
      return(
        <div>
        <div>

        <Accordion>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Location Actions
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <AddLocation/><br/>
                    <UpdateLocation/><br/>
                    <DeleteLocation/><br/>
                    <AddSlot/><br/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Faculty Actions
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <AddFaculty /><br/>
                    <UpdateFaculty /><br/>
                    <DeleteFaculty /><br/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Department Actions
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <AddDepartment /><br/>
                    <UpdateDepartment /><br/>
                    <DeleteDepartment /><br/>
                    <AssignHod /><br/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    Course Actions
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                <Card.Body>
                    <AddCourse /><br/>
                    <UpdateCourse /><br/>
                    <DeleteCourse /><br/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                    Member Actions
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="4">
                <Card.Body>
                    <AddHrMember /><br/>
                    <AddAcademicMember /><br/>
                    <UpdateStaffMember /><br/>
                    <DeleteStaffMember /><br/>
                    <AddSignIn /><br/>
                    <AddSignOut /><br/>
                    <UpdateSalary /><br/>
                    <ViewMemAttButtonModal /><br/>
                    <Button variant="primary" href="/ViewMissing"  class= "mt-10">
                        ViewMissings
                    </Button>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </div>
        </div>
      )
  };
};
export default HRPage;
