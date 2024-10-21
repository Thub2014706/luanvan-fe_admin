import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Badge, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatBot from '~/components/ChatBot/ChatBot';
import ImageBase from '~/components/ImageBase/ImageBase';
import { setSocketConnect } from '~/features/socket/socketSlide';

const ChatPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState();
    // const [chats, setChats] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL);
        dispatch(setSocketConnect(socket))
        socket.emit('listUser', user?.data.id);

        socket.on('userList', (list) => {
            setUsers(list);
        });

        socket.on('message', (msg) => {
            socket.emit('listUser', user?.data.id);
        });

        return () => {
            socket.off('userList');
            socket.off('message');
            socket.disconnect();
        };
    }, [user?.data.id]);
    console.log(users);

    return (
        <div className="p-4" style={{ height: '90vh' }}>
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Hỗ trợ</h5>
                </Col>
            </Row>
            <Row style={{ height: '78vh', borderTop: '1px solid #d7d7d7' }}>
                <Col
                    xs={3}
                    className="py-4"
                    style={{ height: '78vh', border: '1px solid #d7d7d7', borderTop: 'none', borderRight: 'none' }}
                >
                    {users.map((item) => (
                        <div
                            className="d-flex align-items-center justify-content-between"
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectUser === item._id ? '#d7d7d7' : 'transparent',
                                padding: '10px',
                            }}
                            onClick={() => setSelectUser(item._id)}
                        >
                            <div className='d-flex align-items-center '>
                                {item.avatar ? (
                                    <ImageBase
                                        pathImg={item.avatar}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <Avatar name={item.username.charAt(0)} size="40" round={true} color="gray" />
                                )}
                                <h5 className="mb-0 ms-2">{item.username}</h5>
                            </div>
                            <div>
                                <Badge
                                    // style={{ top: 0, position: 'absolute', transform: 'translate(-50%, 0%)' }}
                                    pill
                                    bg="danger"
                                >
                                    {1}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </Col>
                <Col xs={9} style={{ height: '78vh', border: '1px solid #d7d7d7', borderTop: 'none' }}>
                    <div style={{ height: '100%' }}>
                        {/* <div style={{ height: '100%', width: '1px', backgroundColor: 'gray' }}></div> */}
                        {selectUser && <ChatBot receiver={selectUser} />}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;
