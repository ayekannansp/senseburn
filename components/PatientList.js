import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import UserIcon from './shared/icon/UserIcon'
import Dropdown from 'react-bootstrap/Dropdown';
import VerticalIcon from './shared/icon/VerticalIcon';
import SearchBox from './shared/SearchBox';
import PlusIcon from './shared/icon/PlusIcon';
import { useRouter } from 'next/router'

function PatientList() {
    const router = useRouter()

    const datas = [
        {
            name: 'Maria john',
            gender: 'Male',
            age: '24',
            img: ['/img/1.jpg', '/img/1.jpg']
        }
        , {
            name: 'Maria Joseph',
            gender: 'Female',
            age: '22',
            img: ['/img/1.jpg', '/img/1.jpg']
        }
    ]

    return (
        <>
            <section className='banner inner'>
                <Container>
                    <Row>
                        <Col md={12} className='mb-4'>
                            <div className='d-flex align-items-center'>
                                <div style={{ flex: '3' }}>
                                    <SearchBox />
                                </div>
                                <div style={{ flex: '2' }} className='d-flex justify-content-end'>
                                    <Button variant='transparent' onClick={() => router.push('/new-patient')}><PlusIcon /></Button>
                                </div>
                            </div>
                        </Col>

                        {datas.map((data, index) => (
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
                                                <Dropdown.Item href="#">History</Dropdown.Item>
                                                <Dropdown.Item href="#">Scan</Dropdown.Item>
                                                <Dropdown.Item href="#">Delete</Dropdown.Item>
                                                <Dropdown.Item href="#">Edit</Dropdown.Item>
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
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default PatientList