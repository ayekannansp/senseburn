import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import MyLineChart from "../shared/Chart";
import axios from "axios";
//import { data } from "./data";

function ContainerRawData({ containerId, show, fullscreen, handleClose }) {
    const [containerData, setContainerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!containerId) return;

            try {
                const response = await axios.get(
                    "/api/datarawbycontainer?containerId=" + containerId
                );

                if (response.data.success) {
                    setContainerData(response.data.responseBody);
                } else {
                    setError(response.data.message || "An error occurred");
                }
            } catch (error) {
                console.log("Error =>", error);
                setError("An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [containerId]);

    return (
        <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Raw Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MyLineChart data={containerData} />
            </Modal.Body>
        </Modal>
    );
}

export default ContainerRawData;
