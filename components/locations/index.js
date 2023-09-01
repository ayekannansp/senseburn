import React, { useState, useEffect } from "react";
import useFetchDevices from "@/hooks/useFetchDevices";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Table } from "react-bootstrap";
import SearchIcon from "../shared/icon/SearchIcon";

export default function Location() {
    const [datas, setDatas] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [searchText, setSearchText] = useState("");
    const [filteredDatas, setfilteredDatas] = useState([]);
    const { locations } = useFetchDevices("locations");

    useEffect(() => {
        setDatas(locations ? locations["hydra:member"] : []);
        setfilteredDatas(
            datas.filter(
                (data) =>
                    String(data.name)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.address)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.poBox)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.zip)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.country)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.dateCreated
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            )
        );
    }, [locations, searchText]);

    const ListItem = (data) => {
        const { user: Createdby } = useFetchUser(
            "/api/users/" + data.userCreated
        );

        return (
            <div className="col-12">
                <Table striped hover className="device-list mb-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>PO Box, Zip, Country</th>
                            <th>Created by</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.address}</td>
                            <td>
                                {data.poBox}
                                {"  "} {data.zip} {"  "} {data.country}
                            </td>
                            <td>
                                <span className=" capitalize data">
                                    {(Createdby?.firstName || "") +
                                        " " +
                                        (Createdby?.lastName || "")}
                                </span>
                            </td>
                            <td>
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

        return (
            <Col className=" p-2" lg={3} md={6} xs={12}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Name</span>
                            <span className=" capitalize data">
                                {data.name}
                            </span>
                        </div>
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Address</span>
                            <span className=" data">{data.address}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">PO BOX, ZIP</span>
                            <span className=" capitalize data">
                                {data.poBox}
                                {"  "}
                                {data.zip}
                            </span>
                        </div>
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Country</span>
                            <span className=" capitalize data">
                                {data.country}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block "></span>
                            <span className=" capitalize data"></span>
                        </div>
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Created by</span>
                            <span className=" capitalize data">
                                {(Createdby?.firstName || "") +
                                    " " +
                                    (Createdby?.lastName || "")}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Date</span>
                            <span className=" data">
                                {new Intl.DateTimeFormat("en-GB").format(
                                    new Date(Date(data.dateCreated))
                                )}
                            </span>
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
