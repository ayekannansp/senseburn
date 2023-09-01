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
                    <Col md={12}>
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
                </Row>
                <Row className="mt-4">
                    <Col md={12}>
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

                <Row className="mt-4">
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
