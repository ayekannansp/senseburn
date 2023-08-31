import React from 'react'
import Modal from 'react-bootstrap/Modal';
import MyLineChart from '../shared/Chart';
import { data } from './data';

function RowData({ show, fullscreen, handleClose }) {
    return (
        <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Raw Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MyLineChart data={data} />
            </Modal.Body>
        </Modal>
    )
}

export default RowData