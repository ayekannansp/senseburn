import React, { useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import PatientDetail from './PatientDetailForm';
import PatientCensorList from './PatientCensorListForm';
import Stepper from '../../shared/Stepper';
import PatientBurnDetail from './PatientBurnDetailForm';



function AddPatient() {

    const [currentStep, setCurrentStep] = useState(0);
    const [prevStep, setPrevStep] = useState(null);

    function handleNext() {
        setPrevStep(currentStep);
        setCurrentStep(currentStep + 1);
    }

    function handlePrev() {
        setPrevStep(currentStep);
        setCurrentStep(currentStep - 1);
    }

    const stepBarWidth = `${(currentStep / 2) * 102}%`;

    const steps = [
        <PatientDetail />,
        <PatientCensorList />,
        <PatientBurnDetail />,
    ];

    return (
        <>
            <section>
                <Container className='px-0'>
                    <Form>
                        <div className='position-relative my-2 my-md-3'>
                            <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} stepBarWidth={stepBarWidth} />
                        </div>
                        <div className='wrapper'>
                            <Row>
                                <Col md={12}>
                                    {steps[currentStep]}
                                </Col>
                            </Row>
                        </div>
                        <div className='d-flex gap-2 justify-content-end footer'>
                            <Button size='md' variant='dark' className='px-4 py-2 rounded-1' onClick={handlePrev} disabled={currentStep === 0}>
                                Previous
                            </Button>
                            <Button size='md' variant='dark' className={`px-4 py-2 rounded-1 ${currentStep === 2 ? 'd-none' : ''}`} onClick={handleNext}>
                                Next
                            </Button>
                            <Button size='md' variant='primary' className={`px-4 py-2 rounded-1 ${currentStep === 2 ? '' : 'd-none'}`}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Container>
            </section >
        </>
    )
}

export default AddPatient