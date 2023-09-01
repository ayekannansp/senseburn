import React, { useState, useEffect } from "react";
import useFetchUsers from "@/hooks/useFetchDevices";

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
    const { users } = useFetchUsers("users");

    useEffect(() => {
        setDatas(users ? users["hydra:member"] : []);
        setfilteredDatas(
            datas.filter(
                (data) =>
                    String(data?.firstName)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.lastName)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.phoneNr)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    String(data.email)
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            )
        );
    }, [users, searchText]);

    const ListItem = (data) => {
        return (
            <div className="col-12">
                <Table striped hover className="device-list mb-0">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone</th>
                            <th>e-Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.phoneNr}</td>
                            <td>{data.email}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };

    const GridItem = (data) => {
        return (
            <Col className=" p-2" lg={3} md={6} xs={12}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">First Name</span>
                            <span className=" capitalize data">
                                {data.firstName}
                            </span>
                        </div>
                        <div className=" align-items-center gap-2">
                            <span className="d-block ">Last Name</span>
                            <span className=" data">{data.lastName}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
                        <div className="align-items-center gap-2">
                            <span className="d-block ">Phone</span>
                            <span className=" capitalize data">
                                {data.phoneNr}
                            </span>
                        </div>
                        <div className="align-items-center gap-2">
                            <span className="d-block ">e-Mail</span>
                            <span className=" capitalize data">
                                {data.email}
                            </span>
                        </div>
                    </div>{" "}
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
