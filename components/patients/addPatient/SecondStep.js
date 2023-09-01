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
            <Col md={6} className="mb-3 mb-md-3">
                <h6>Selection of Measuring Device</h6>
                <Form.Select aria-label="NanoVNA" className="form-control">
                    <option value="NVNA">NanoVNA</option>
                    <option value="MVNA">MiniVNA</option>
                    <option value="CM">Copper Mount</option>
                </Form.Select>
            </Col>
            <Col md={6} className="mb-3 mb-md-3">
                <div className="d-flex gap-2 align-items-center">
                    <Form.Group className="w-100">
                        <Form.Label>Measurement location</Form.Label>
                        <Form.Control
                            type="file"
                            id="burnImage"
                            accept=".jpg,.jpeg,.png"
                            className="form-control custom-file-upload mb-1"
                            onChange={(event) => {
                                handleImageChange(event, setBurnImages);
                                onChange();
                            }
                            }


                        />
                        <Form.Text className="mt-2">
                            ( Format jpg (or) jpeg. | Maximum size 4MB )
                        </Form.Text>
                    </Form.Group>
                    {/* <div className="uploader">
                        {burnImages.length === 0 ? (
                            <Image
                                src="/img/placeholder.png"
                                alt="Burn"
                            />
                        ) : (
                            <>
                                {burnImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="image-container position-relative">
                                        <Image
                                            src={image}
                                            alt={`Burn ${index + 1}`}
                                        />
                                        <div className="delete-overlay">
                                            <Button
                                                className="p-0"
                                                variant="transparent"
                                                onClick={() =>
                                                    handleDeleteImage(
                                                        index,
                                                        setProbleImages
                                                    )
                                                }>
                                                <i className="pi pi-trash"></i>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div> */}
                </div>
            </Col>
            <Col md={6}>
                <div className="d-flex gap-2 align-items-center">
                    <Form.Group className="w-100">
                        <Form.Label>
                            Measurement photo with censor
                        </Form.Label>
                        <Form.Control
                            type="file"
                            id="probleImage"
                            accept=".jpg,.jpeg,.png"
                            className="form-control custom-file-upload mb-1"
                            onChange={(event) => {
                                handleImageChange(
                                    event,
                                    setProbleImages
                                );
                                onChange();
                            }}
                        />
                        <Form.Text className="mt-2">
                            ( Format jpg (or) jpeg. | Maximum size 4MB )
                        </Form.Text>
                    </Form.Group>
                    {/* <div className="uploader">
                        {probleImages.length === 0 ? (
                            <Image
                                src="/img/placeholder.png"
                                alt="Burn"
                            />
                        ) : (
                            <>
                                {probleImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="image-container position-relative">
                                        <Image
                                            src={image}
                                            alt={`Proble ${index + 1}`}
                                        />
                                        <div className="delete-overlay">
                                            <Button
                                                className="p-0"
                                                variant="transparent"
                                                onClick={() =>
                                                    handleDeleteImage(
                                                        index,
                                                        setProbleImages
                                                    )
                                                }>
                                                <i className="pi pi-trash"></i>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div> */}
                </div>
            </Col>
        </Row>
    );
}

export default PatientCensorList;
