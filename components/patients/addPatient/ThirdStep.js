import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import BMIGauge from "./BMIGauge";

function PatientBurnDetail({ bmi, patientForm, onChange }) {
    const [burnImages, setBurnImages] = useState([]);
    const [probleImages, setProbleImages] = useState([]);

    const handleImageChange = (event, setImage) => {
        const selectedImage = event.target.files[0];
        setImage((prevImages) => [
            ...prevImages,
            URL.createObjectURL(selectedImage),
        ]);
    };

    const handleDeleteImage = (index, setImage) => {
        setImage((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <Row>
            <Col md={6}>
                <Row>
                    <Col className="mb-2" md={12}>
                        <div className="d-flex gap-4 align-items-center">
                            <Form.Group>
                                <Form.Label className="m-0 lc">
                                    ANATOMICAL LANDMARK*
                                </Form.Label>
                            </Form.Group>
                        </div>
                    </Col>
                    <Col md={12}>
                        <Form.Select
                            aria-label="NanoVNA"
                            className="form-control">
                            <option value="Thigh">
                                Thigh: Left & Right (Separately)
                            </option>
                            <option value="Lowerlimb">
                                Lower limb: Left & Right (Separately)
                            </option>
                            <option value="Arms">
                                Arms: Left & Right (Separately)
                            </option>
                            <option value="Forearm">
                                Forearm: Left & Right (Separately)
                            </option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="mb-2" md={12}>
                        <Form.Group>
                            <Form.Label className="m-0 lc">
                                Description
                            </Form.Label>
                            <Form.Control as="textarea" rows={3}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col md={6} className="d-flex justify-content-center">
                <div className="text-center">
                    <h6 className="mb-4">BMI</h6>
                    <BMIGauge bmi={bmi} />
                </div>
            </Col>
        </Row>
    );
}

export default PatientBurnDetail;
