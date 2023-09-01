import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SearchIcon from "../shared/icon/SearchIcon";
import { Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import useFetchUser from "@/hooks/useFetchUser";

import ContainerRawData from "./ContainerRawData";
import useFetchContainers from "@/hooks/useFetchContainers";

export default function Containers({ extractList }) {
    const [datas, setDatas] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [searchText, setSearchText] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [filteredDatas, setFilteredDatas] = useState(null);
    const [selectedContainer, setselectedContainer] = useState(null);

    const { containers } = useFetchContainers("containers");

    useEffect(() => {
        setDatas(containers ? containers["hydra:member"] : []);
        setFilteredDatas(
            datas?.filter(
                (data) =>
                    data?.dataFormatVersion
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase()) ||
                    data?.measurementType
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase()) ||
                    data?.userCreated
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase()) ||
                    data?.dateCreated
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase())
            )
        );
    }, [containers, searchText]);

    useEffect(() => {
        if (!containers || !extractList) return;

        const matchingElements = containers?.filter((member) =>
            extractList.includes(member["@id"])
        );

        setDatas(matchingElements);
    }, [extractList]);

    const handleShow = (containerId = null) => {
        setselectedContainer(containerId);
        if (containerId) setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const ListItem = (data) => {
        const { user, loading, error } = useFetchUser(data.User);

        return (
            <div className="col-12">
                <Table striped hover className="patient-list mb-0">
                    <thead>
                        <tr>
                            <th>Format</th>
                            <th>Measurment type</th>
                            <th>Created by</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span className=" data capitalize">
                                    {data.dataFormatVersion}
                                </span>
                            </td>
                            <td>{data.measurementType}</td>
                            <td>
                                <span className=" data capitalize">
                                    {(user?.firstName || "") +
                                        " " +
                                        (user?.lastName || "")}
                                </span>
                            </td>

                            <td>
                                {new Intl.DateTimeFormat("en-GB").format(
                                    new Date(Date(data.dateCreated))
                                )}
                            </td>
                            <td
                                className="pe-4 pointer"
                                onClick={() =>
                                    handleShow(data["@id"].split("/").pop())
                                }>
                                <i className="pi pi-eye"></i>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };

    const GridItem = (data) => {
        const { user, loading, error } = useFetchUser(data.User);
        return (
            <Col
                className="p-2 pointer"
                lg={3}
                md={6}
                xs={12}
                onClick={() => handleShow(data["@id"].split("/").pop())}
                key={data["@id"].split("/").pop()}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <Row>
                        <Col xs={12} className=" align-items-center gap-2">
                            <span className="d-block ">Measurement type</span>
                            <span className=" data">
                                {data?.measurementType}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="align-items-center gap-2">
                            <span className="d-block ">Format</span>
                            <span className=" capitalize data">
                                {data?.dataFormatVersion}
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        {/* <Col xs={6} className="align-items-center gap-2">
                            <span className="d-block ">Created by</span>
                            <span className=" data capitalize">
                                {(user?.firstName || "") +
                                    " " +
                                    (user?.lastName || "")}
                            </span>
                        </Col> */}
                        <Col xs={12} className=" align-items-center gap-2">
                            <span className="d-block ">Date</span>
                            <span className=" data">
                                {new Intl.DateTimeFormat("en-GB").format(
                                    new Date(Date(data.dateCreated))
                                )}
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
        <>
            <div className="layout">
                <DataView
                    value={filteredDatas}
                    itemTemplate={itemTemplate}
                    layout={layout}
                    header={header()}
                />
            </div>
            <ContainerRawData
                containerId={selectedContainer}
                show={showModal}
                fullscreen={fullscreen}
                handleClose={handleClose}
            />
        </>
    );
}
