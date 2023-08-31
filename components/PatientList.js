import React, { useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import UserIcon from './shared/icon/UserIcon'
import Dropdown from 'react-bootstrap/Dropdown';
import VerticalIcon from './shared/icon/VerticalIcon';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PlusIcon from './shared/icon/PlusIcon';
import { useRouter } from 'next/router'
import SearchIcon from './shared/icon/SearchIcon';
import Table from 'react-bootstrap/Table';

function PatientList() {
    const router = useRouter()

    const initialDatas = [
        {
            name: 'Maria john',
            gender: 'Male',
            age: '24',
            img: ['/img/1.jpg', '/img/1.jpg'],
            slug: 'ID200001',
        },
        {
            name: 'Maria Joseph',
            gender: 'Female',
            age: '22',
            img: ['/img/1.jpg', '/img/1.jpg'],
            slug: 'ID200002',
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
    const [view, setView] = useState('list'); // Default view is 'list'

    const handleViewChange = (newView) => {
        setView(newView);
    };
    return (
        <>
            <section className='banner inner'>
                <Container>
                    <Row>
                        <Col md={12} className='mb-4'>
                            <div className='d-flex align-items-center'>
                                <div style={{ flex: '3' }}>
                                    <InputGroup className="search">
                                        <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Search.."
                                            type='search'
                                            onChange={handleSearch}
                                        />
                                    </InputGroup>
                                </div>
                                <div style={{ flex: '2' }} className='d-flex justify-content-end icon-btn'>
                                    <Button variant='light' onClick={() => handleViewChange('list')}><i className="pi pi-list" ></i></Button>
                                    <Button variant='light' onClick={() => handleViewChange('table')}><i className="pi pi-table" ></i></Button>
                                    <Button variant='light' onClick={() => router.push('/new-patient')}><i className="pi pi-plus"></i></Button>
                                </div>
                            </div>
                        </Col>
                        {view === 'list' &&
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
                                                            <Dropdown.Item href={`/patients/${data.slug}`}><i className="pi pi-history"></i> History</Dropdown.Item>
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
                        }
                        {view === 'table' &&

                            datas.map((data, index) => (
                                <Col md={4} key={index}>
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
                                                    <Dropdown.Item href={`/patients/${data.slug}`}><i className="pi pi-history"></i> History</Dropdown.Item>
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
                            ))

                        }

                    </Row>
                </Container>
            </section>
        </>
    )
}

export default PatientList