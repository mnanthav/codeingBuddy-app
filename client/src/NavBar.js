//============================================================================
// client/src/NavBar.js
//============================================================================
import React from 'react';
import {
    Navbar, Nav, NavDropdown, Offcanvas,
    Container, Row, Col, Form, Button
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    return (
        <div>
            <Navbar
                collapseOnSelect
                expand="lg"
            >
                <Navbar.Toggle 
                    aria-controls="responsive-navbar-nav"
                />
                <Navbar.Collapse 
                    id="responsive-navbar-nav"
                >
                    <Nav 
                        className="justify-content-end flex-grow-1 pe-3"
                        // style={{width: '100%'}}
                    >
                        <Nav.Link
                            as={NavLink}
                            to="/login"
                            // className={styles.navLink}
                        >
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {[true].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand? 'lg': false}
                    className="mb-3"
                >
                    <Container>
                        <Navbar.Brand
                            as={NavLink}
                            to="/"
                        >
                            Code(ing) Buddy
                        </Navbar.Brand>
                        <Navbar.Toggle 
                            aria-controls={`offcanvasNavbaar-expand-${expand}`}
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbar-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbar-expand-${expand}`}
                                >
                                    Code(ing) Buddy
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Form
                                    className="d-flex"
                                >
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalSearch"
                                    >
                                        <Col>
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                // className="me-2"
                                                aria-label="Search"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Select 
                                                defaultValue="From..."
                                            >
                                                <option>
                                                    From...
                                                </option>
                                                <option>
                                                    C++
                                                </option>
                                                <option>
                                                    Java 
                                                </option>
                                                <option>
                                                    JavaScript 
                                                </option>
                                                <option>
                                                    Python
                                                </option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Select
                                                defaultValue="To..."
                                            >
                                                <option>
                                                    To...
                                                </option>
                                                <option>
                                                    C++
                                                </option>
                                                <option>
                                                    Java 
                                                </option>
                                                <option>
                                                    JavaScript 
                                                </option>
                                                <option>
                                                    Python
                                                </option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Button>
                                                Search
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <Nav
                                    className="justify-content-end flex-grow-1 pe-3"
                                >
                                    <NavDropdown
                                        title="Menu"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/about-us"
                                            // className={styles.navdropdownitem}
                                        >
                                            Get to Know Me {'(:'}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/languages"
                                        >
                                            Languages
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/languages/cplusplus"
                                        >
                                            C++
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/languages/java"
                                        >
                                            Java
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/languages/javascript"
                                        >
                                            JavaScript
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/languages/python"
                                        >
                                            Python
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/languages/quick-references"
                                        >
                                            Quick References
                                        </NavDropdown.Item>
                                        {/*
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/"
                                        >

                                        </NavDropdown.Item>
                                        */}
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
};