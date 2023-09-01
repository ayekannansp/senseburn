import React, { useState, useEffect } from "react";

import { Button, ButtonGroup, Col, Image, Row } from "react-bootstrap";
import UserIcon from "../shared/icon/UserIcon";
import Dropdown from "react-bootstrap/Dropdown";
import VerticalIcon from "../shared/icon/VerticalIcon";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SearchIcon from "../shared/icon/SearchIcon";
import Table from "react-bootstrap/Table";
import AddPatient from "./addPatient/AddPatient";
import Modal from "react-bootstrap/Modal";
import Containers from "../Containers";

import useFetchClients from "@/hooks/useFetchClients";
import useFetchUser from "@/hooks/useFetchUser";

function PatientList() {
    const [datas, setDatas] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showContainer, setShowContainer] = useState(false);
    const handleContainerClose = () => setShowContainer(false);
    const [view, setView] = useState("list");
    const [fullscreen, setFullscreen] = useState(true);

    const [containerExtractList, setcontainerExtractList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredDatas, setfilteredDatas] = useState([]);
    const { clients: patients } = useFetchClients("clients");

    useEffect(() => {
        setDatas(patients ? patients["hydra:member"] : []);
        setfilteredDatas(
            datas?.filter(
                (data) =>
                    String(data?.name)
                        .toLowerCase()
                        .includes(searchText?.toLowerCase()) ||
                    String(data?.gender)
                        .toLowerCase()
                        .includes(searchText?.toLowerCase()) ||
                    String(data?.age)
                        .toLowerCase()
                        .includes(searchText?.toLowerCase())
            )
        );
    }, [patients, searchText]);

    const handleContainerShow = (patient) => {
        if (!patient) return;

        setcontainerExtractList(patient?.containers);
        setShowContainer(true);
    };

    const handleDelete = (indexToDelete) => {
        const newDatas = datas.filter((_, index) => index !== indexToDelete);
        setDatas(newDatas);
    };

    const CardView = ({ data }) => {
        const { user } = useFetchUser(data?.user);

        return (
            <Col xxl={3} xl={4} lg={6} className="mb-3">
                <div className="card-wrapper border-card">
                    <div className="card-head p-4 border-bottom d-flex justify-content-between">
                        <div className="header w-100">
                            <span className="user">
                                <UserIcon />
                            </span>
                            <span>
                                <span className="name d-block mb-1 capitalize">
                                    {user?.firstName || ""}
                                    {"  "}
                                    {user?.lastName || ""}
                                </span>
                                <span className="user-info ">
                                    {data?.gender} &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                                    height:{data?.height}
                                    <br />
                                    &nbsp;&nbsp;|&nbsp;&nbsp; weight:{" "}
                                    {data?.weight} <br />
                                    &nbsp;&nbsp;|&nbsp;&nbsp; Age: {data?.age}
                                </span>
                            </span>
                        </div>
                        <Dropdown drop="start">
                            <Dropdown.Toggle
                                id="action"
                                variant="transparent"
                                className="p-0">
                                <VerticalIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => handleContainerShow(data)}>
                                    <i className="pi pi-history"></i> History
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                    <i className="pi pi-search"></i> Scan
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleDelete(index)}>
                                    <i className="pi pi-trash"></i> Delete
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                    <i className="pi pi-user-edit"></i> Edit
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="card_body p-4">
                        <div className="img-container">
                            <div className='d-flex'>
                                {data?.img?.map((imgPath, imgIndex) => (
                                    <div key={imgIndex}>
                                        <Image
                                            src={imgPath}
                                            className="img-thumbnail"
                                            alt="profile image"
                                        />
                                    </div>
                                ))}
                                <span>5 <span  className="user-info ">Measurements</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    };

    const TableRow = ({ data, index }) => {
        const { user } = useFetchUser(data?.user);
        return (
            <>
                <tr key={index}>
                    <td>
                        <span className="capitalize">
                            {user?.firstName || ""}
                            {"  "}
                            {user?.lastName || ""}
                        </span>
                    </td>
                    <td>{data?.gender}</td>
                    <td>{data?.age}</td>
                    <td>
                        <span className="img-td">
                            {data?.img?.map((imgPath, imgIndex) => (
                                <span key={imgIndex}>
                                    <Image src={imgPath} />
                                </span>
                            ))}
                        </span>
                    </td>
                    <td>{data.height}</td>
                    <td>{data.weight}</td>
                    <td className="text-right">
                        <Dropdown drop="start">
                            <Dropdown.Toggle
                                id="action"
                                variant="transparent"
                                className="p-0">
                                <VerticalIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleContainerShow}>
                                    <i className="pi pi-history"></i> History
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                    <i className="pi pi-search"></i> Scan
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleDelete(index)}>
                                    <i className="pi pi-trash"></i> Delete
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                    <i className="pi pi-user-edit"></i> Edit
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            </>
        );
    };

    const TableView = () => {
        return (
            <Col md="12">
                <Table striped hover className="patient-list">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Image</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDatas.map((data, index) => (
                            <TableRow data={data} index={index} key={index} />
                        ))}
                    </tbody>
                </Table>
            </Col>
        );
    };

    return (
        <>
            <section className="layout">
                <Row>
                    <Col md={12} className="mb-4">
                        <div className="d-flex align-items-center header-bar">
                            <div style={{ flex: "2" }} className="max-600">
                                <InputGroup className="search">
                                    <InputGroup.Text id="basic-addon1">
                                        <SearchIcon />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search.."
                                        type="search"
                                        onChange={(event) =>
                                            setSearchText(
                                                event?.target?.value?.toLowerCase() ||
                                                ""
                                            )
                                        }
                                    />
                                </InputGroup>
                            </div>
                            <div
                                style={{ flex: "1" }}
                                className="d-flex justify-content-end icon-btn">
                                <ButtonGroup className="d-md-flex d-none">
                                    <Button
                                        variant={
                                            view === "table"
                                                ? "primary"
                                                : "light"
                                        }
                                        onClick={() => setView("table")}>
                                        <i className="pi pi-list"></i>
                                    </Button>
                                    <Button
                                        variant={
                                            view === "list"
                                                ? "primary"
                                                : "light"
                                        }
                                        onClick={() => setView("list")}>
                                        <i className="pi pi-th-large"></i>
                                    </Button>
                                </ButtonGroup>
                                <Button
                                    variant="light"
                                    title="Add new patients"
                                    onClick={handleShow}>
                                    <i className="pi pi-plus"></i>
                                </Button>
                            </div>
                        </div>
                    </Col>
                    {filteredDatas.length === 0 ? (
                        <Col md="12" className="text-center">
                            <div>No records found</div>
                        </Col>
                    ) : view === "table" ? (
                        <TableView />
                    ) : (
                        filteredDatas.map((data, index) => (
                            <CardView key={index} data={data} />
                        ))
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

            <Modal
                show={showContainer}
                onHide={handleContainerClose}
                fullscreen={fullscreen}>
                <Modal.Header closeButton>
                    <Modal.Title>Container</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Containers extractList={containerExtractList} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PatientList;
