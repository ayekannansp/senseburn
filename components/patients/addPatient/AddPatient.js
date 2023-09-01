import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { Col, Container, Row, Button, Form } from "react-bootstrap";
import PatientDetail from "./PatientDetailForm";
import PatientCensorList from "./PatientCensorListForm";
import Stepper from "../../shared/Stepper";
import PatientBurnDetail from "./PatientBurnDetailForm";

function AddPatient() {
    const [currentStep, setCurrentStep] = useState(0);
    const [prevStep, setPrevStep] = useState(null);
    const [bmi, setBMI] = useState(null);

    function handleNext() {
        setPrevStep(currentStep);
        setCurrentStep(currentStep + 1);
    }

    function handlePrev() {
        setPrevStep(currentStep);
        setCurrentStep(currentStep - 1);
    }

    const stepBarWidth = `${(currentStep / 2) * 102}%`;

    const patientForm = useFormik({
        initialValues: {
            anatomicalLandmark: "",
            description: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    function calculateBMI(weightKg, heightCM) {
        const heightM = heightCM / 100;
        const bmi = weightKg / (heightM * heightM);
        return bmi;
    }

    useEffect(() => {
        setBMI(
            calculateBMI(patientForm.values.weight, patientForm.values.height)
        );
    }, [patientForm.values]);

    const onChange = () => {
        console.log("onChange =>", patientForm.values);
    };

    return (
        <>
            <section>
                <Container className="px-0">
                    <Form>
                        <div className="position-relative my-2 my-md-3">
                            <Stepper
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                                stepBarWidth={stepBarWidth}
                            />
                        </div>
                        {currentStep === 0 && (
                            <>
                                <div className="wrapper">
                                    <Row>
                                        <Col md={12}>
                                            <div
                                                style={{
                                                    position: "sticky",
                                                    top: "0",
                                                }}>
                                                <PatientDetail
                                                    patientForm={patientForm}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                <div className="wrapper">
                                    <Row>
                                        <Col md={12}>
                                            <PatientCensorList
                                                patientForm={patientForm}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className="wrapper">
                                    <PatientBurnDetail
                                        bmi={bmi}
                                        patientForm={patientForm}
                                    />
                                </div>
                            </>
                        )}
                        <div className="d-flex gap-2 justify-content-end footer">
                            <Button
                                size="md"
                                variant="dark"
                                className="px-4 py-2 rounded-1"
                                onClick={handlePrev}
                                disabled={currentStep === 0}>
                                Previous
                            </Button>
                            <Button
                                size="md"
                                variant="dark"
                                className={`px-4 py-2 rounded-1 ${
                                    currentStep === 2 ? "d-none" : ""
                                }`}
                                onClick={handleNext}>
                                Next
                            </Button>
                            <Button
                                size="md"
                                variant="primary"
                                className={`px-4 py-2 rounded-1 ${
                                    currentStep === 2 ? "" : "d-none"
                                }`}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Container>
            </section>
        </>
    );
}

export default AddPatient;
