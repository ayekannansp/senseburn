import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { Col, Row, Form } from "react-bootstrap";

function PatientCensorList({ patientForm }) {
    return (
        <Row>
            <Col md={6} className="mb-3 mb-md-3">
                <h6>Selection of Censor</h6>
                <Form.Select aria-label="BSF censor" className="form-control">
                    <option value="BSF">BSF censor</option>
                    <option value="BMR">BEEAMER</option>
                </Form.Select>
            </Col>
            <Col md={6}>
                <h6>Selection of Measuring Device</h6>
                <Form.Select aria-label="NanoVNA" className="form-control">
                    <option value="NVNA">NanoVNA</option>
                    <option value="MVNA">MiniVNA</option>
                    <option value="CM">Copper Mount</option>
                </Form.Select>
            </Col>
        </Row>
    );
}

export default PatientCensorList;
