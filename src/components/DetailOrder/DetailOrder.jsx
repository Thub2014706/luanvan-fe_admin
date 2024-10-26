import moment from 'moment';
import React from 'react';
import Barcode from 'react-barcode';
import { Modal, Table } from 'react-bootstrap';

const DetailOrder = ({ item, show, handleClose, refund }) => {
    console.log(item);

    return (
        item && (
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Mã vé: {item.idOrder}{' '}
                        <span className="h5">
                            (Trạng thái:{' '}
                            {refund ? (
                                <span style={{ color: 'red' }}>Đã hoàn trả</span>
                            ) : (
                                <span style={{ color: 'green' }}>Đã hoàn tất</span>
                            )}
                            )
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="justify-content-center d-flex">
                        <Barcode
                            value={item.idOrder}
                            height={50}
                            width={1}
                            fontSize={10}
                            fontOptions="Courier New, monospace"
                        />
                    </div>
                    <Table className="my-3">
                        <tr>
                            {item.member && (
                                <>
                                    <td style={{ width: '160px' }}>Khách hàng:</td>
                                    <td className="fw-bold">{item.member.username}</td>
                                </>
                            )}
                            <td style={{ width: '160px' }}>Thời gian đặt vé:</td>
                            <td className="fw-bold" style={{width: 'auto'}}>{moment(item.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            {item.member && (
                                <>
                                    <td style={{ width: '160px' }}>Số điện thoại:</td>
                                    <td className="fw-bold">{item.member.phone}</td>
                                </>
                            )}
                            <td style={{ width: '160px' }}>Hình thức đặt vé:</td>
                            <td className="fw-bold">{item.staff ? 'Đặt vé tại rạp' : 'Đặt vé online'}</td>
                        </tr>
                        <tr>
                            {item.member && (
                                <>
                                    <td style={{ width: '160px' }}>Email:</td>
                                    <td className="fw-bold">{item.member.email}</td>
                                </>
                            )}
                            {item.staff && (
                                <>
                                    <td style={{ width: '160px' }}>Nhân viên bán vé:</td>
                                    <td className="fw-bold">{item.staff.username}</td>
                                </>
                            )}
                        </tr>
                    </Table>

                    <Table bordered className="text-center">
                        <thead>
                            <tr>
                                {item.showTime && (
                                    <>
                                        <th>PHIM</th>
                                        <th>SUẤT CHIẾU</th>
                                    </>
                                )}
                                {item.combo.length > 0 && <th>COMBO BẮP NƯỚC</th>}
                                <th>TỔNG THANH TOÁN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {item.showTime && (
                                    <>
                                        <td className="align-middle">
                                            {item.showTime.schedule.film.name.toUpperCase()}
                                        </td>
                                        <td>
                                            <p>
                                                <span className="fw-bold">Rạp: {item.showTime.theater.name}</span>{' '}
                                                <br />
                                                Phòng: {item.showTime.room.name}
                                                <br />
                                                Ghế:{' '}
                                                {item.seat.map((mini, index) => (
                                                    <span>
                                                        {String.fromCharCode(64 + mini.row)}
                                                        {mini.col}
                                                        {index < item.seat.length - 1 && ', '}
                                                    </span>
                                                ))}
                                                <br />
                                                {moment(item.showTime.date).format('DD-MM-YYYY')}
                                                <br />
                                                {item.showTime.timeStart} - {item.showTime.timeEnd}
                                            </p>
                                        </td>
                                    </>
                                )}
                                {item.combo.length > 0 && (
                                    <td className="align-middle">
                                        {item.combo.map((mini) => (
                                            <span>
                                                {mini.quantity} {mini.name.toUpperCase()}
                                                <br />
                                            </span>
                                        ))}
                                    </td>
                                )}
                                <td className="align-middle">
                                    {(item.usePoint > 0 || item.discount) && (
                                        <p className="mb-0">
                                            Tổng:{' '}
                                            {(
                                                item.usePoint +
                                                (item.discount ? item.discount.useDiscount : 0) +
                                                item.price
                                            ).toLocaleString('it-IT')}{' '}
                                            đ
                                        </p>
                                    )}
                                    {item.usePoint > 0 && (
                                        <p className="mb-0">
                                            Điểm thanh toán: -{item.usePoint.toLocaleString('it-IT')}đ
                                        </p>
                                    )}
                                    {item.discount && (
                                        <p className="mb-0">
                                            Mã khuyến mãi: -{item.discount.useDiscount.toLocaleString('it-IT')}đ
                                        </p>
                                    )}
                                    <p className="fw-bold mb-0">
                                        Tổng thanh toán: {item.price.toLocaleString('it-IT')}đ
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        )
    );
};

export default DetailOrder;
