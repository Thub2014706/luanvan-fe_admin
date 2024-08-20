import React from 'react';
import { Modal } from 'react-bootstrap';

const QrUser = ({ show, handleClose, img }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <img className='mx-auto d-block' src={img} style={{height: '200px', width: 'auto'}} alt="" />
            </Modal.Body>
        </Modal>
    );
};

export default QrUser;
