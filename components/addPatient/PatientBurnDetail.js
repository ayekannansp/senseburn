import React, { useState } from 'react'
import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import PlusIcon from '../shared/icon/PlusIcon';
import ChartData from './ChartData';

function PatientBurnDetail() {
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
    const [burnImages, setBurnImages] = useState([]);
    const [probleImages, setProbleImages] = useState([]);

    const handleImageChange = (event, setImage) => {
        const selectedImage = event.target.files[0];
        setImage((prevImages) => [...prevImages, URL.createObjectURL(selectedImage)]);
    };

    const handleDeleteImage = (index, setImage) => {
        setImage((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    return (
        <Row>
            <Col md={6}>
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Burn Image</Form.Label>
                            <Form.Control
                                type='file'
                                id='burnImage'
                                accept='.jpg,.jpeg,.png'
                                className='form-control custom-file-upload mb-1'
                                onChange={(event) => handleImageChange(event, setBurnImages)}
                            />
                            <Form.Text className='mt-2'>( Format jpg (or) jpeg.  |  Maximum size 4MB )</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <div className='uploader mb-3 mt-3'>
                            {burnImages.length === 0 ? (
                                <Image src='/img/placeholder.png' alt='Burn' className='img-thumbnail' />
                            ) : (
                                <>
                                    {burnImages.map((image, index) => (
                                        <div key={index} className='image-container position-relative'>
                                            <Image src={image} alt={`Burn ${index + 1}`} />
                                            <div className='delete-overlay'>
                                                <Button className='p-0' variant='transparent'
                                                    onClick={() => handleDeleteImage(index, setBurnImages)}
                                                >
                                                    <i className="pi pi-trash"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Proble Image</Form.Label>
                            <Form.Control
                                type='file'
                                id='probleImage'
                                accept='.jpg,.jpeg,.png'
                                className='form-control custom-file-upload mb-1'
                                onChange={(event) => handleImageChange(event, setProbleImages)}
                            />
                            <Form.Text className='mt-2'>( Format jpg (or) jpeg.  |  Maximum size 4MB )</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <div className='uploader mb-3 mt-3'>
                            {probleImages.length === 0 ? (
                                <Image src='/img/placeholder.png' alt='Burn' className='img-thumbnail' />
                            ) : (
                                <>
                                    {probleImages.map((image, index) => (
                                        <Image key={index} src={image} alt={`Proble ${index + 1}`} className='img-thumbnail' />
                                    ))}
                                </>
                            )}
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
                                <option>Select</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Form.Select>
                            <Form.Control type="num" className='cm' />
                            <Form.Label className='m-0'>CM</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col md={6} className='d-flex justify-content-center'>
                <div className='text-center'>
                    <h6 className='mb-4'>Anatomical Thickness</h6>
                    <ChartData />
                </div>
            </Col>
        </Row>
    )
}

export default PatientBurnDetail