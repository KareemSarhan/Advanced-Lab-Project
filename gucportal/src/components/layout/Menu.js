import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Menu extends Component {
    render() {
        return (
            <div>
                <nav class="navbar bg-light">

                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/viewMembers">View Members </a>
                    </li>
                    <li class="nav-item">
                        <Link to ="/viewLeaveReq" class="nav-link" >View Leave Requests</Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/viewMembers">View Members </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/viewDayOffReq">View Day Off Requests </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/viewDaysOffAll">View Staff Day Off </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ViewCourseMembers">View Course Members </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ViewCoverage">View Courses Coverage </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/viewCourseAssignment">View Course Slot Assignment</a>
                    </li>
                    </ul>

</nav>
            </div>
        )
    }
}

export default Menu
