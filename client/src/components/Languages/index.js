//================================================================
// client/src/components/Languages/index.js
//================================================================
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { 
    Container, Row, Col, 
    Accordion, Card, Button 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Languages() {

    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getLanguages = async () => {
        try {
            const res = await axios.get('/language/list');
            
            setLanguages(res.data.data);
            setLoading(false);
        }
        catch (err) {
            console.error("Failed to fetch languages:", err);
            setError(err.messsage);
            setLanguages([]);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col
                    xs={12} 
                    md={8}
                >
                    <h1>
                        Programming Languages
                    </h1>
                    <p>
                        Explore the variety of programming languages I have available for you: 
                        (Code(ing) Buddy has worked so hard on these{'(,: '})
                    </p>
                </Col>
            </Row>
                {loading && <div>Loading...</div>}
                {error && <div> `Error: {error}`</div>}
            <Accordion
                as={Row}
            >
                {languages.map((lang) => (
                    <Accordion.Item
                        eventKey={lang._id}
                    >
                        <Accordion.Header>
                            {lang.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            <h3>
                                Creator: {lang.creator} - {lang.year_created}
                            </h3>
                            <p>
                                {lang.description}<br/>
                                {lang.url}
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <Row>
                <Col>
                    <Button
                        as={Link}
                        to='/languages/cplusplus'
                    >
                        C++ {/* change to icon button later */}
                    </Button>
                </Col>
                <Col>
                    <Button
                        as={Link}
                        to='/languages/java'
                    >
                        Java
                    </Button>
                </Col>
                <Col>
                    <Button
                        as={Link}
                        to='/languages/javascript'
                    >
                        JavaScript
                    </Button>
                </Col>
                <Col>
                    <Button
                        as={Link}
                        to='/languages/python'
                    >
                        Python
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
/*
const [activeKey, setActiveKey] = useState(-1);
const handleAccordion = (key) => {
        if (key === activeKey) {
            setActiveKey(-1); // closes accordion if already open
        } else {
            setActiveKey(key); // opens accordion
        }
    }
        <Container fluid>
            <Row>
                <Col
                    xs={12} 
                    md={8}
                >
                    <h1>
                        Programming Languages
                    </h1>
                    <p>
                        Explore the variety of programming languages I have available for you: 
                        (Code(ing) Buddy has worked so hard on these{'(,: '})
                    </p>
                </Col>
            </Row>
            <Row>
                {loading && <div>Loading...</div>}
                {error && <div> `Error: {error}`</div>}
                <Accordion activeKey="0">
                    {languages && languages.map((lang, index, langs) => (
                        <Card
                            as={Col}
                        >
                            <Accordion.Toggle 
                                as={Card.Header}
                                eventKey={index+""}    
                            >
                                {lang.name}
                                <i className="fas fa-sort-down"></i>    
                            </Accordion.Toggle> 
                            <Accordion.Collapse
                                eventKey={index+""} 
                            >
                                <Card.Body>
                                    <Card.Title>
                                        Creator: {lang.creator} - {lang.year_created}
                                    </Card.Title>
                                    <Card.Text>
                                        {lang.description}
                                        {lang.url}
                                    </Card.Text>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                 </Accordion>
            </Row>
        </Container>
{languages.map((lang, index) => (
                                <Card key={lang.id || index}>
                                    <Card.Header>
                                        <Accordion.Toggle
                                            as={Button}
                                            variant="link"
                                            eventKey={String(index)}
                                            onClick={() => handleAccordion(String(index))}
                                        >
                                            {lang.name}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={String(index)}>
                                        <Card.Body>
                                            <Card.Title>
                                                Creator: {lang.creator} - {lang.year_created}
                                            </Card.Title>
                                            <Card.Text>
                                                {lang.description}
                                                {lang.url}
                                            </Card.Text>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ))}
<Col
                        xs={6}
                        md={4}
                    >
                        <p>
                            For example,
                        </p>
                        <ul>
                            <li>
                                HTML and CSS are used for designing and styling web pages;
                                respectively, though they are not programming languages in 
                                the traditional sense because they do not involve logic or
                                algorithms.
                            </li>
                            <li>
                                In contrast, languages like C++ and Java are true programming
                                languages used for a variety of applications, like software 
                                development and so on. 
                            </li>
                        </ul>
                    </Col>
<Accordion activeKey={activeKey}>
                {languages.map((lang, index) => (
                    <Card key={index}>
                        <Card.Header>
                            <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey={index}
                                onClick={() => handleAccordion(lang.id)}
                            >
                                {lang.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse
                            eventKey={index}
                        >
                            <Card.Body>
                                <Card.Title>
                                    Creator: {lang.creator} - {lang.year_created}
                                </Card.Title>
                                <Card.Body>
                                    {lang.description}<br/>
                                    {lang.url}
                                </Card.Body>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
<div>
            <h1>
                Programming Languages
            </h1>
            <p>
                There are hundreds of different programming languages,
                each designed with specific purposes in mind. <br/>
                For example:
            </p>
            <ul>
                <li>
                    HTML and CSS are used for designing and styling web pages;
                    respectively, though they are not programming languages in 
                    the traditional sense because they do not involve logic or
                    algorithms.
                </li>
                <li>
                    In contrast, languages like C++ and Java are true programming
                    languages used for a variety of applications, like software 
                    development and so on. 
                </li>
            </ul>
            <p>
                Programming languages: formal languages that compilers or interpreters 
                use to execute commands to produce intended outcomes
            </p>
            <p>
                Below is a list of programming languages that Code(ing) Buddy can help you with {'(:'}
            </p> 
            {loading && <div>Loading...</div>}
            {error && <div> `Error: {error}`</div>}
            <Accordion>
                {languages.map(lang => (
                    <Accordion.Item key={lang.id}>
                        <Accordion.Header>
                            <h1>
                                {lang.name}
                            </h1>
                        </Accordion.Header>
                        <Accordion.Body>
                            <h4>
                                Creator: {lang.creator} - {lang.year_created}
                            </h4>
                            <p>
                                {lang.description}
                            </p>
                            <p>
                                {lang.url}
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
*/