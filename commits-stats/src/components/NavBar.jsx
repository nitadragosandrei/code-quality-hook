import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function NavBar( props ) {
    console.log("props", props.props.allCommits);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link}
                                  to={{
                                      pathname: '/commits',
                                      state: { props: props},
                                  }}
                        >
                            Commits
                        </Nav.Link>
                        <Nav.Link href="#home">Graph by date</Nav.Link>
                        <Nav.Link href="#files">Show files</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;