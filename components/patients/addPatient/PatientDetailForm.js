import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { InputText } from "primereact/inputtext";

function PatientDetail({ patientForm }) {
    return (
        <div className="add-patients">
            <Form.Group className="mb-1 mb-md-3">
                <Row>
                    <Col xl={4} md={12} className="mb-1 mb-md-0">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            {...patientForm.getFieldProps("firstname")}
                            type="text"
                            id="f_name"
                            value={patientForm.values.firstname}
                            placeholder="Enter first name"
                        />
                    </Col>
                    <Col xl={4} md={12} className="mb-1 mb-md-0">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            {...patientForm.getFieldProps("lastname")}
                            type="text"
                            id="l_name"
                            value={patientForm.values.lastname}
                            placeholder="Enter last name"
                        />
                    </Col>
                    <Col xl={4} md={12}>
                        <Form.Label>Patient ID</Form.Label>
                        <Form.Control
                            {...patientForm.getFieldProps("patientid")}
                            type="text"
                            value={patientForm.values.patientid}
                            placeholder="Enter patient ID"
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-1 mb-md-3">
                <Row>
                    <Col xl={6} md={12} className="mb-1 mb-md-0">
                        <Form.Label>Height(CM)</Form.Label>
                        <Form.Control
                            {...patientForm.getFieldProps("height")}
                            type="number"
                            id="height"
                            value={patientForm.values.height}
                            placeholder="Enter Height(CM)"
                        />
                    </Col>
                    <Col xl={6} md={12}>
                        <Form.Label>Weight(KG)</Form.Label>
                        <Form.Control
                            {...patientForm.getFieldProps("weight")}
                            type="number"
                            id="weight"
                            value={patientForm.values.weight}
                            placeholder="Enter Weight(KG)"
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-1 mb-md-3">
                <Row>
                    <Col xl={6} md={12} className="mb-1 mb-md-0">
                        <Form.Label>Gender</Form.Label>
                        {["radio"].map((type) => (
                            <div key={`inline-${type}`}>
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
                    <Col xl={6} md={12}>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            id="age"
                            placeholder="Enter Age"
                        />
                    </Col>
                </Row>
            </Form.Group>
        </div>
    );
}

export default PatientDetail;
