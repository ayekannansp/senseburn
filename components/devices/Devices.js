
import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '../shared/icon/SearchIcon';
import { Col, Table } from 'react-bootstrap';


export default function Devices() {
    const [datas, setDatas] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [searchText, setSearchText] = useState('');


    const deviceData = {
        "@context": "/api/contexts/Device",
        "@id": "/api/devices",
        "@type": "hydra:Collection",
        "hydra:member": [
            {
                "@id": "/api/devices/1ed6030c-4e34-6420-a6ff-81111d99f353",
                "@type": "Device",
                "registeredAt": 1667999809,
                "version": "Example Device Version",
                "serial": "Example Device serial",
                "userCreated": "12-05-2022",
                "userUpdated": "15-12-2022",
                "dateCreated": '12-05-2022',
                "user": "/api/users/1ed59694-cec9-6656-af18-6bcb1cc34486",
                "locations": ["/api/locations/1ed60237-7ebe-6fe4-95c1-db3bd3113326"],
                "containers": ["/api/containers/1ee36960-ab2b-6bde-9c3c-8f85a6522499"]
            }
        ],
        "hydra:totalItems": 1
    };



    useEffect(() => {
        setDatas(deviceData["hydra:member"]);
    }, []);

    const filteredDatas = datas.filter(data =>
        String(data.registeredAt).toLowerCase().includes(searchText.toLowerCase()) ||
        data.version.toLowerCase().includes(searchText.toLowerCase()) ||
        data.serial.toLowerCase().includes(searchText.toLowerCase()) ||
        data.userCreated.toLowerCase().includes(searchText.toLowerCase())
    );

    const listItem = (data) => {
        return (
            <div className="col-12">
                <Table striped hover className='device-list mb-0' >
                    <thead>
                        <tr>
                            <th>Registerd at</th>
                            <th>Version</th>
                            <th>Serial</th>
                            <th>User Created On</th>
                            <th>User Updated On</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.registeredAt}</td>
                            <td>{data.version}</td>
                            <td>{data.serial}</td>
                            <td>{data.userCreated}</td>
                            <td>{data.userUpdated}</td>
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
                            <span className="d-block ">Registerd at</span>
                            <span className=" capitalize data">{data.registeredAt}</span>
                        </div>
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Version</span>
                            <span className=" data">{data.version}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Serail: <span className="data">{data.serial}</span></span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">User Created On</span>
                            <span className=" capitalize data">{data.userCreated}</span>
                        </div>
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">User Updated On</span>
                            <span className=" data">{data.userUpdated}</span>
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
