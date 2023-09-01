import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Image, Row } from 'react-bootstrap'
import UserIcon from '../shared/icon/UserIcon'
import Dropdown from 'react-bootstrap/Dropdown';
import VerticalIcon from '../shared/icon/VerticalIcon';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '../shared/icon/SearchIcon';
import Table from 'react-bootstrap/Table';
import AddPatient from './addPatient/AddPatient';
import Modal from 'react-bootstrap/Modal';
import Containers from '../Containers';

function PatientList() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showContainer, setShowContainer] = useState(false);
    const handleContainerClose = () => setShowContainer(false);
    const handleContainerShow = () => setShowContainer(true);

    const [fullscreen, setFullscreen] = useState(true);

    const initialDatas = [
        {
            name: 'Maria john',
            gender: 'Male',
            age: '24',
            img: ['/img/1.jpg', '/img/2.jpg'],
            slug: 'ID200001',
        },
        {
            name: 'Maria Joseph',
            gender: 'Female',
            age: '22',
            img: ['/img/1.jpg', '/img/2.jpg'],
            slug: 'ID200002',
        },
        {
            name: 'John Mike',
            gender: 'Male',
            age: '22',
            img: ['/img/1.jpg', '/img/2.jpg'],
            slug: 'ID200003',
        },
        {
            name: 'Sam CS',
            gender: 'Male',
            age: '28',
            img: ['/img/1.jpg', '/img/2.jpg'],
            slug: 'ID200004',
        }
    ];


    const [datas, setDatas] = useState(initialDatas);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredDatas = initialDatas.filter(data =>
            data.name.toLowerCase().includes(searchTerm) ||
            data.gender.toLowerCase().includes(searchTerm) ||
            data.age.toLowerCase().includes(searchTerm)
        );
        setDatas(filteredDatas);
    };

    const handleDelete = (indexToDelete) => {
        const newDatas = datas.filter((_, index) => index !== indexToDelete);
        setDatas(newDatas);
    };

    const [view, setView] = useState('list');

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const CardView = ({ data }) => (
        <Col xxl={3} xl={4} lg={6} className='mb-3'>
            <div className='card-wrapper border-card'>
                <div className='card-head p-4 border-bottom d-flex justify-content-between'>
                    <div className='header'>
                        <span className='user'>
                            <UserIcon />
                        </span>
                        <span>
                            <span className='name d-block mb-1'>{data.name}</span>
                            <span className='user-info'>
                                {data.gender} &nbsp;&nbsp;|&nbsp;&nbsp; {data.age}y old
                            </span>
                        </span>
                    </div>
                    <Dropdown drop='start'>
                        <Dropdown.Toggle id="action" variant="transparent" className='p-0'>
                            <VerticalIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={handleContainerShow}><i className="pi pi-history"></i> History</Dropdown.Item>
                            <Dropdown.Item href="#"><i className="pi pi-search"></i> Scan</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(index)}><i className="pi pi-trash"></i> Delete</Dropdown.Item>
                            <Dropdown.Item href="#"><i className="pi pi-user-edit"></i> Edit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='card_body p-4'>
                    <div className='img-container'>
                        {data.img.map((imgPath, imgIndex) => (
                            <div key={imgIndex}>
                                <Image src={imgPath} className='img-thumbnail' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Col>
    );

    const TableView = () => (
        <Col md='12'>
            <Table striped hover className='patient-list'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Image</th>
                        <th className='text-right'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={index} >
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.age}</td>
                            <td >
                                <span className='img-td'>
                                    {data.img.map((imgPath, imgIndex) => (
                                        <span key={imgIndex}>
                                            <Image src={imgPath} />
                                        </span>
                                    ))}
                                </span>
                            </td>
                            <td className='text-right'>
                                <Dropdown drop='start'>
                                    <Dropdown.Toggle id="action" variant="transparent" className='p-0'>
                                        <VerticalIcon />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleContainerShow}><i className="pi pi-history"></i> History</Dropdown.Item>
                                        <Dropdown.Item href="#"><i className="pi pi-search"></i> Scan</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDelete(index)}><i className="pi pi-trash"></i> Delete</Dropdown.Item>
                                        <Dropdown.Item href="#"><i className="pi pi-user-edit"></i> Edit</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    );

    return (
        <>
            <section className='layout'>
                <Row>
                    <Col md={12} className='mb-4'>
                        <div className='d-flex align-items-center header-bar'>
                            <div style={{ flex: '2' }} className='max-600'>
                                <InputGroup className="search">
                                    <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search.."
                                        type='search'
                                        onChange={handleSearch}
                                    />
                                </InputGroup>
                            </div>
                            <div style={{ flex: '1' }} className='d-flex justify-content-end icon-btn'>
                                <ButtonGroup className='d-md-flex d-none'>
                                    <Button variant={view === 'table' ? 'primary' : 'light'} onClick={() => handleViewChange('table')}><i className="pi pi-list" ></i></Button>
                                    <Button variant={view === 'list' ? 'primary' : 'light'} onClick={() => handleViewChange('list')}><i className="pi pi-th-large" ></i></Button>
                                </ButtonGroup>
                                <Button variant='light' title='Add new patients' onClick={handleShow}><i className="pi pi-plus"></i></Button>
                            </div>
                        </div>
                    </Col>
                    {datas.length === 0 ? (
                        <Col md='12' className='text-center'>
                            <div>No records found.. Click + button to add patients</div>
                        </Col>
                    ) : (
                        view === 'table' ? <TableView /> : datas.map((data, index) => <CardView key={index} data={data} />)
                    )}
                </Row>
            </section>

            <Modal show={show} onHide={handleClose} fullscreen={fullscreen}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Patients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPatient />
                </Modal.Body>
            </Modal>

            <Modal show={showContainer} onHide={handleContainerClose} fullscreen={fullscreen}>
                <Modal.Header closeButton>
                    <Modal.Title>Container</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Containers />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PatientList;
