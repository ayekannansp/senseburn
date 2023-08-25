import React, { useState } from 'react'
import { Col, Container, Row, Button, Form, Image } from 'react-bootstrap'
import AddPatientForm from './AddPatientForm';
import CensorList from './CensorList';
import Stepper from '../shared/Stepper';
import PlusIcon from '../shared/icon/PlusIcon';
import ChartData from './ChartData';



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

    const options = [
        'Anus',
        'Jugular notch',
        'Processus coracoideus Right (shoulder)',
        'Nipple Left',
        'Nipple Right',
        'Angulus inferior scapulae Left',
        'Angulus inferior scapulae Right',
        'Umbilicus (navel)',
        'Processus styloideus ulnae Left (anterior)',
        'Processus styloideus ulnae Left (posterior)',
        'Processus styloideus ulnae Right (anterior)',
        'Processus styloideus ulnae Right (posterior)'
    ];
    return (
        <>
            <section className='banner inner pt-3'>
                <Container>
                    <div className='position-relative mt-4 mb-5 mx-4'>
                        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} stepBarWidth={stepBarWidth} />
                    </div>
                    {currentStep === 0 && <>
                        <div className='wrapper'>
                            <Row>
                                <Col md={12}>
                                    <div style={{ position: 'sticky', top: '0' }}>
                                        <AddPatientForm />
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
                                    <CensorList />
                                </Col>
                            </Row>
                        </div>
                    </>}
                    {currentStep === 2 && <>
                        <div className='wrapper'>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Row>
                                            <Col md={8}>
                                                <Form.Group className="mb-5 " controlId="burnImage">
                                                    <Form.Label>Burn Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        className='custom-file-upload mb-1'
                                                    />
                                                    <Form.Text className='mt-2'>( Format jpg (or) jpeg.  |  Maximum size 4MB )</Form.Text>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="probleImage">
                                                    <Form.Label>Proble Image Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        className='custom-file-upload mb-1'
                                                    />
                                                    <Form.Text className='mt-2'>( Format jpg (or) jpeg.  |  Maximum size 4MB )</Form.Text>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <div className='uploader mb-5 mt-4'>
                                                    <Image src='/img/placeholder.png' alt='placeholder' />
                                                </div>
                                                <div className='uploader'>
                                                    <Image src='/img/placeholder.png' alt='placeholder' />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className='my-5'>
                                            <Col>
                                                <h6 className='text-center'>BMI: 112.5</h6>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mb-4' md={12}>
                                                <div className='d-flex gap-4 align-items-center'>
                                                    <Form.Group>
                                                        <Form.Label className='m-0 lc'>Anatomical Landmarks for Sensor Position*</Form.Label>
                                                    </Form.Group>
                                                    <Button variant='dark' className='p-2'><PlusIcon /></Button>
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className='d-flex align-items-center gap-2'>
                                                    <Form.Label className='m-0 lc'>Landmark 1</Form.Label>
                                                    <Form.Select aria-label="landmark" className='form-control'>
                                                        <option></option>
                                                        {options.map((option, index) => (
                                                            <option key={index} value={option}>{option}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Control type="num" className='cm' />
                                                    <Form.Label className='m-0'>CM</Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                                <Col md={6} className='d-flex justify-content-center'>
                                    <div className='text-center'>
                                        <h6 className='mb-4'>Anatomical Thickness</h6>
                                        <ChartData />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </>}
                    <Row>
                        <Col>
                            <div className='d-flex gap-2 justify-content-end mt-4'>
                                <Button size='md' variant='dark' className='px-4 py-2 mt-4' onClick={handlePrev} disabled={currentStep === 0}>
                                    Previous
                                </Button>
                                <Button size='md' variant='dark' className='px-4 py-2 mt-4' onClick={handleNext} disabled={currentStep === 2}>
                                    Next
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AddPatient