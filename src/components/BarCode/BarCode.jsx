import React from 'react';
import Barcode from 'react-barcode';
import { Modal } from 'react-bootstrap';

const BarCode = ({ show, handleClose, id }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="justify-content-center d-flex">
                    <Barcode value={id} height={50} width={1} fontSize={10} fontOptions="Courier New, monospace" />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BarCode;
