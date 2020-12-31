import React, { Component } from 'react'
import { Button,Collapse,Nav,Tab,Row,Sonnet,Col} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';


class SideMenu extends Component{
    render(){
        return(
            <Tab.Container id="left-tabs-example"  defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        )
    }

}

export default SideMenu;