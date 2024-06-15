//================================================================
// client/src/components/Homepage/index.js
//================================================================
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
export default function Homepage() {

    return (
        <div>
            <Container>
                <Row>
                    <Col
                        xs={12}
                        md={8}
                    >
                        <h1>
                            Hello World!
                        </h1>
                        <div>
                            <h3>
                                Welcome to Code(ing) Buddy!
                            </h3>
                            <p>
                                I am here to help you when you are coding or 
                                are starting to learn a new language!
                                I hope that I can be your buddy for all your
                                programming needs{' (:'}
                            </p>
                            <p>
                                The programming languages that I can help you 
                                out with (as of right now) are:
                            </p>
                            <ul>
                                <li>
                                    C++
                                </li>
                                <li>
                                    Java
                                </li>
                                <li>
                                    JavaScript
                                </li>
                                <li>
                                    Python
                                </li>
                            </ul>
                            <p>
                                {'('}Don't worry about my limited languages {'):'},
                                more will be added in the future!{')'} 
                            </p>
                        </div>
                        <Button>
                            Learn More
                        </Button>
                    </Col>
                    <Col
                        xs={6}
                        md={4}
                    >
                        <Row>
                            <h2>
                                Language Comparisons
                            </h2>
                            <p> 
                                write abt it
                            </p>
                            <Button> 
                                View Details
                            </Button>
                        </Row>
                        <Row>
                            <h2>
                                Quick References
                            </h2>
                            <p>
                                write about it 
                            </p>
                            <Button> 
                                View Details
                            </Button>
                        </Row>
                        <Row>
                            <h2>
                                Programming Guides
                            </h2>
                            <p>
                                write about it
                            </p>
                            <Button>
                                View Details
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>
                            Send a Request:
                        </h1>
                        <p>
                            Know of ways to make me better? Please let me know!
                        </p>
                        <p>
                            I am here to be the best buddy so please don't keep 
                            any secrets {'(,:'}
                        </p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="requestForm.ControlTextArea1"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="outline-light"
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col>
                        <h3>
                            insert inspiring quotes here
                        </h3>
                        <p>
                            quote #1
                        </p>
                        <p>
                            quote #2
                        </p>
                        <p>
                            quote #3
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            insert some cool programming photos here:
                        </p>
                    </Col>
                    <Col>
                        {/* insert pic of me */}
                        <h2>
                            About me (The Creator)
                        </h2>
                        <p>
                            write stuff about myself
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}