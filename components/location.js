
import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Table } from 'react-bootstrap';
import SearchIcon from './shared/icon/SearchIcon';


export default function Location() {
    const [datas, setDatas] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [searchText, setSearchText] = useState('');


    const locationData = {
        "@context": "/api/contexts/Client",
        "@id": "/api/clients",
        "@type": "hydra:Collection",
        "hydra:member": [
            {
                "@id": "/api/clients/1ed602b6-241d-6246-83a0-8d196db9b54f",
                "@type": "Client",
                "age": 18,
                "height": 80,
                "weight": 180,
                "userCreated": "12-5-2023",
                "dateCreated": "12-5-2023",
                "user": "/api/users/1ed59694-cec9-6656-af18-6bcb1cc34486",
                "locations": [
                    "/api/locations/1ed60237-7ebe-6fe4-95c1-db3bd3113326"
                ],
                "containers": [
                    "/api/containers/1ee36960-ab2b-6bde-9c3c-8f85a6522499"
                ]
            }
        ],
        "hydra:totalItems": 1
    };



    useEffect(() => {
        setDatas(locationData["hydra:member"]);
    }, []);

    const filteredDatas = datas.filter(data =>
        String(data.age).toLowerCase().includes(searchText.toLowerCase()) ||
        String(data.height).toLowerCase().includes(searchText.toLowerCase()) ||
        String(data.weight).toLowerCase().includes(searchText.toLowerCase()) ||
        data.userCreated.toLowerCase().includes(searchText.toLowerCase()) ||
        data.dateCreated.toLowerCase().includes(searchText.toLowerCase()) 
    );

    const listItem = (data) => {
        return (
            <div className="col-12">
                <Table striped hover className='device-list mb-0' >
                    <thead>
                        <tr>
                            <th>Age</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Created by</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.age}</td>
                            <td>{data.height}</td>
                            <td>{data.weight}</td>
                            <td>{data.userCreated}</td>
                            <td>{data.dateCreated}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };

    const gridItem = (data) => {
        return (
            <Col className=" p-2" lg={3} md={6} xs={12}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Age</span>
                            <span className=" capitalize data">{data.age}</span>
                        </div>
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Height</span>
                            <span className=" data">{data.height}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Weight</span>
                            <span className=" capitalize data">{data.weight}</span>
                        </div>
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Created by</span>
                            <span className=" capitalize data">{data.userCreated}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                       
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Date</span>
                            <span className=" data">{data.dateCreated}</span>
                        </div>
                    </div>
                </div>
            </Col>

        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'grid') return gridItem(data);
        else if (layout === 'list') return listItem(data);
    };

    const header = () => {
        return (
            <div className="flex justify-content-between align-items-center gap-3">
                <InputGroup className="search max-600">
                    <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                    <Form.Control
                        placeholder="Search.."
                        type='search'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </InputGroup>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="layout">
            <DataView value={filteredDatas} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
}
