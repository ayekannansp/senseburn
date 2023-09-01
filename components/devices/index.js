import React, { useState, useEffect } from "react";
import useFetchDevices from "@/hooks/useFetchDevices";
import useFetchUser from "@/hooks/useFetchUser";

import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SearchIcon from "../shared/icon/SearchIcon";
import { Row, Col, Table } from "react-bootstrap";

export default function Devices() {
    const [datas, setDatas] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [searchText, setSearchText] = useState("");
    const [filteredDatas, setfilteredDatas] = useState([]);
    const { devices, loading, error } = useFetchDevices("devices");

    useEffect(() => {
        setDatas(devices ? devices["hydra:member"] : []);
        setfilteredDatas(
            datas.filter(
                (data) =>
                    String(data.registeredAt)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.version
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.serial
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.userCreated
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            )
        );
    }, [devices, searchText]);

    const ListItem = (data) => {
        const { user: Createdby } = useFetchUser(
            "/api/users/" + data.userCreated
        );
        const { user: Updatedby } = useFetchUser(
            "/api/users/" + data.userUpdated
        );

        return (
            <div className="col-12">
                <Table striped hover className="device-list mb-0">
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
                            <td>
                                {" "}
                                <span className=" capitalize data">
                                    {(Createdby?.firstName || "") +
                                        " " +
                                        (Createdby?.lastName || "")}
                                </span>
                            </td>
                            <td>
                                {" "}
                                <span className=" capitalize data">
                                    {(Updatedby?.firstName || "") +
                                        " " +
                                        (Updatedby?.lastName || "")}
                                </span>
                            </td>
                            <td>
                                {" "}
                                {new Intl.DateTimeFormat("en-GB").format(
                                    new Date(Date(data.dateCreated))
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };

    const GridItem = (data) => {
        const { user: Createdby } = useFetchUser(
            "/api/users/" + data.userCreated
        );
        const { user: Updatedby } = useFetchUser(
            "/api/users/" + data.userUpdated
        );
        return (
            <Col className=" p-2" lg={3} md={6} xs={12}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <Row>
                        <Col xs={6} className="align-items-center gap-2">
                            <span className="d-block ">Registered on</span>
                            <span className=" capitalize data">
                                {new Intl.DateTimeFormat("en-GB").format(
                                    new Date(Date(data.registeredAt))
                                )}
                            </span>
                        </Col>
                        <Col xs={6} className=" align-items-center gap-2">
                            <span className="d-block ">Version</span>
                            <span className=" data">{data.version}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="align-items-center gap-2">
                            <span className="d-block ">Serial: </span>
                            <span className="data">{data.serial}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className="align-items-center gap-2">
                            <span className="d-block ">Created by</span>
                            <span className=" capitalize data">
                                {(Createdby?.firstName || "") +
                                    " " +
                                    (Createdby?.lastName || "")}
                            </span>
                        </Col>
                        <Col xs={6} className=" align-items-center gap-2">
                            <span className="d-block ">Updated by</span>
                            <span className=" capitalize data">
                                {(Updatedby?.firstName || "") +
                                    " " +
                                    (Updatedby?.lastName || "")}
                            </span>
                        </Col>
                    </Row>
                </div>
            </Col>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === "grid") return GridItem(data);
        else if (layout === "list") return ListItem(data);
    };

    const header = () => {
        return (
            <div className="flex justify-content-between align-items-center gap-3">
                <InputGroup className="search max-600">
                    <InputGroup.Text id="basic-addon1">
                        <SearchIcon />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search.."
                        type="search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </InputGroup>
                <DataViewLayoutOptions
                    layout={layout}
                    onChange={(e) => setLayout(e.value)}
                />
            </div>
        );
    };

    return (
        <div className="layout">
            <DataView
                value={filteredDatas}
                itemTemplate={itemTemplate}
                layout={layout}
                header={header()}
            />
        </div>
    );
}
