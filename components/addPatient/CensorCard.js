import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import VerticalIcon from '../shared/icon/VerticalIcon';

function CensorCard(props) {
    return (
        <div className='censor-card-wrapper bg-white p-4 mt-3 rounded-3'>
            <div className='censor-card'>
                <span className='status success'></span>
                <div>
                    <p>5a5fbcb5-c72e-45d7-b54a</p>
                    <h6 className='mb-0'>BMC – UPPSALA BIOMEDICAL CENTRE</h6>
                </div>
            </div>
            <Dropdown drop='start'>
                <Dropdown.Toggle id="action" variant="transparent" className='p-0'>
                    <VerticalIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item onClick={props.handleShow}>Change sensor</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default CensorCard