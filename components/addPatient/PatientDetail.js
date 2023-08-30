import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

function PatientDetail() {
    return (
        <>
            <Form.Group className="mb-4">
                <Row>
                    <Col>
                        <Form.Label>Patient ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter patient ID" />
                    </Col>
                    <Col>
                        <Form.Label>Gender</Form.Label>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} >
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Female"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                            </div>
                        ))}
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-4">
                <Row>
                    <Col>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" id="f_name" placeholder="Enter first name" />
                    </Col>
                    <Col>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" id="l_name" placeholder="Enter last name" />

                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-0">
                <Row>
                    <Col>
                        <Form.Label>Height(CM)</Form.Label>
                        <Form.Control type="number" id="height" placeholder="Enter Height(CM)" />
                    </Col>
                    <Col>
                        <Form.Label>Weight(KG)</Form.Label>
                        <Form.Control type="number" id="weight" placeholder="Enter Weight(KG)" />
                    </Col>
                    <Col>
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" id="age" placeholder="Enter Age" />
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

export default PatientDetail