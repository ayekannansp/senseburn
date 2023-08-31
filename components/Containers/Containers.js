
import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '../shared/icon/SearchIcon';
import { Col, Table } from 'react-bootstrap';

import RowData from './RowData';


export default function Containers() {
    const [datas, setDatas] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [fullscreen, setFullscreen] = useState(true);
    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const containerData = {
        "@context": "/api/contexts/Container",
        "@id": "/api/containers",
        "hydra:member": [
            {
                "@id": "/api/containers/1ee36960-ab2b-6bde-9c3c-8f85a6522499",
                "@type": "Container",
                "dataFormatVersion": "Test version",
                "measurementType": "RI",
                "userCreated": "-",
                "dateCreated": "12-05-2023",
                "devices": ["/api/devices/1ed6030c-4e34-6420-a6ff-81111d99f353"],
                "clients": ["/api/clients/1ed602b6-241d-6246-83a0-8d196db9b54f"],
                "dataRaws": [],
                "dataAnalysis": [],
                "tags": [],
                "User": "/api/users/1ed59694-cec9-6656-af18-6bcb1cc34486"
            }
        ],
        "hydra:totalItems": 1
    };

    useEffect(() => {
        setDatas(containerData["hydra:member"]);
    }, []);

    const filteredDatas = datas.filter(data =>
        data.dataFormatVersion.toLowerCase().includes(searchText.toLowerCase()) ||
        data.measurementType.toLowerCase().includes(searchText.toLowerCase()) ||
        data.userCreated.toLowerCase().includes(searchText.toLowerCase()) ||
        data.dateCreated.toLowerCase().includes(searchText.toLowerCase())
    );

    const listItem = (data) => {
        return (
            <div className="col-12">
                <Table striped hover className='patient-list mb-0' >
                    <thead>
                        <tr>
                            <th>Format</th>
                            <th>Measurment type</th>
                            <th>Created by</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{data.dataFormatVersion}</td>
                            <td>{data.measurementType}</td>
                            <td>{data.userCreated}</td>
                            <td>{data.dateCreated}</td>
                            <td onClick={handleShow} className='pe-4 pointer'><i className="pi pi-eye"></i></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };

    const gridItem = (data) => {
        return (
            <Col className=" p-2 pointer" lg={3} md={6} xs={12} onClick={handleShow}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Format</span>
                            <span className=" capitalize data">{data.dataFormatVersion}</span>
                        </div>
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Measurement type</span>
                            <span className=" data">{data.measurementType}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Created by</span>
                            <span className=" data uppercase">{data.userCreated}</span>
                        </div>
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
        <>
            <div className="layout">
                <DataView value={filteredDatas} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>
            <RowData show={showModal} fullscreen={fullscreen} handleClose={handleClose} />
        </>
    )
}
