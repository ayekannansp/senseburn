import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import jwt from "jsonwebtoken";
import Navbarsection from '@/components/shared/Navbarsection';
import SideNav from '@/components/shared/SideNav';


export async function getServerSideProps(context) {
    const token = context.req.cookies.auth;

    if (!token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(token, "YOUR_INTERNAL_SECRET");
        const user = decoded.user;
        return { props: { user } };
    } catch (error) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
}
const datas = [
    {
        date: '2023-08-15 - 02.30 PM',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 30,
        bmi: 24.5,
        burnDepth: 'Superficial',
    },
    {
        date: '2023-08-16 - 05.30 PM',
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'Female',
        age: 25,
        bmi: 21.8,
        burnDepth: 'Partial Thickness',
    },
    {
        date: '2023-08-17 - 10.30 AM',
        firstName: 'Michael',
        lastName: 'Johnson',
        gender: 'Male',
        age: 45,
        bmi: 29.3,
        burnDepth: 'Full Thickness',
    },
    {
        date: '2023-08-18 - 02.30 PM',
        firstName: 'Emily',
        lastName: 'Brown',
        gender: 'Female',
        age: 28,
        bmi: 22.1,
        burnDepth: 'Partial Thickness',
    },
    {
        date: '2023-08-19 - 02.00 PM',
        firstName: 'William',
        lastName: 'Davis',
        gender: 'Male',
        age: 32,
        bmi: 25.8,
        burnDepth: 'Deep Thickness',
    },
    {
        date: '2023-08-20 - 06.42 PM',
        firstName: 'Sophia',
        lastName: 'Wilson',
        gender: 'Female',
        age: 19,
        bmi: 20.5,
        burnDepth: 'Superficial',
    },
];
function History() {
    return (
        <>
            <Navbarsection />
            <SideNav/>
            <section className='layout'>
                <Container fluid className='px-0'>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>BMI</th>
                                        <th>Burn Depth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datas.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.firstName}</td>
                                            <td>{data.lastName}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.age}</td>
                                            <td>{data.bmi}</td>
                                            <td>{data.burnDepth}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}

export default History


