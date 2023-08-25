import React from 'react'
import classNames from 'classnames';

function CensorList() {

    const datas = [
        {
            censor: '5a5fbcb5-c72e-45d7-b54a',
            center: 'BMC – UPPSALA BIOMEDICAL CENTRE',
            status: 'success',
        },
        {
            censor: '7515f795-5b10-ea11-add2',
            center: 'ÅNGSTRÖM LABORATORY',
            status: 'danger',
        },
        {
            censor: '899b7433-3801-ea11-add2',
            center: 'RUDBECK LABORATORY',
            status: 'danger',
        },
        {
            censor: 'a5aa03d0-93c9-e911-bcd0',
            center: 'EBC – EVOLUTIONARY BIOLOGY CENTRE',
            status: 'danger',
        },
        {
            censor: '3b4cc226-73f9-e911-add2',
            center: 'BLÅSENHUS',
            status: 'danger',
        }
    ]
    return (
        <ul className='censor-list mt-4'>
            {datas.map((data, index) => (
                <li key={index}>
                    <span className='censor-card-wrapper'>
                        <span className='censor-card'>
                            <span className={classNames('status', data.status)}></span>
                            <span>
                                <p>{data.censor}</p>
                                <h6>{data.center}</h6>
                            </span>
                        </span>
                    </span>
                </li>
            ))}

        </ul>
    )
}

export default CensorList