import React, { Component } from 'react'

export class Menu extends Component {
    render() {
        return (
            <div>
                <nav class="navbar bg-light">

                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/viewMembers">View Members</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/viewLeaveReq">View Leave Requests</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link 3</a>
                    </li>
                    </ul>

</nav>
            </div>
        )
    }
}

export default Menu
