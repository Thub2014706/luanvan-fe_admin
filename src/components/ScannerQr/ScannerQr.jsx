import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ScannerQr = ({handleClick, showReader, setValue}) => {

    useEffect(() => {
        if (showReader) {
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 10,
            });

            const success = (result) => {
                const info = JSON.parse(result);
                setValue(info);
                // scanner.clear();
            };

            const error = (err) => {
                console.log(err);
            };

            scanner.render(success, error);
        }
    }, [showReader, setValue]);

    // useEffect(() => {
    //     if (showReader) {
    //         const scanner = new Html5QrcodeScanner('reader', {
    //             qrbox: {
    //                 width: 250,
    //                 height: 250,
    //             },
    //             fps: 10,
    //         });

    //         const success = (result) => {
    //             const info = JSON.parse(result);
    //             setPhone(info.phone);
    //             // scanner.clear();
    //         };

    //         const error = (err) => {
    //             console.log(err);
    //         };

    //         scanner.render(success, error);
    //     }
    // }, [showReader]);

    return (
        <div>
            <Button
                className="mb-2"
                onClick={handleClick}
            >
                {showReader ? 'Ẩn máy quét' : 'Hiển thị máy quét'}
            </Button>
            {showReader && <div id="reader"></div>}
        </div>
    );
};

export default ScannerQr;
