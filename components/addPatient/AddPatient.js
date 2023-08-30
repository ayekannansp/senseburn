import React, { useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import PatientDetail from './PatientDetail';
import PatientCensorList from './PatientCensorList';
import Stepper from '../shared/Stepper';

import PatientBurnDetail from './PatientBurnDetail';



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

    const stepBarWidth = `${(currentStep / 2) * 100}%`;


    return (
        <>
            <section className='banner inner pt-3'>
                <Container>
                    <Form>
                        <div className='position-relative mt-4 mb-5 mx-4'>
                            <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} stepBarWidth={stepBarWidth} />
                        </div>
                        {currentStep === 0 && <>
                            <div className='wrapper'>
                                <Row>
                                    <Col md={12}>
                                        <div style={{ position: 'sticky', top: '0' }}>
                                            <PatientDetail />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </>}
                        {currentStep === 1 && <>
                            <div className='wrapper'>
                                <Row>
                                    <Col md={12}>
                                        <h5>Select sensor</h5>
                                        <PatientCensorList />
                                    </Col>
                                </Row>
                            </div>
                        </>}
                        {currentStep === 2 && <>
                            <div className='wrapper'>
                                <PatientBurnDetail />
                            </div>
                        </>}
                        <Row>
                            <Col>
                                <div className='d-flex gap-2 justify-content-end mt-4'>
                                    <Button size='md' variant='dark' className='px-4 py-2 mt-4 rounded-1' onClick={handlePrev} disabled={currentStep === 0}>
                                        Previous
                                    </Button>
                                    <Button size='md' variant='dark' className={`px-4 py-2 mt-4 rounded-1 ${currentStep === 2 ? 'd-none' : ''}`} onClick={handleNext}>
                                        Next
                                    </Button>
                                    <Button size='md' variant='primary' className={`px-4 py-2 mt-4 rounded-1 ${currentStep === 2 ? '' : 'd-none'}`}>
                                        Submit
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </section >
        </>
    )
}

export default AddPatient