import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Badge, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatBot from '~/components/ChatBot/ChatBot';
import ImageBase from '~/components/ImageBase/ImageBase';
import { setSocketConnect } from '~/features/socket/socketSlide';
import img1 from '~/assets/images/mess-admin.png';
import moment from 'moment';

const ChatPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState();
    // const [chats, setChats] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL, {
            query: { userId: 'adminId' },
        });
        dispatch(setSocketConnect(socket));

        socket.emit('adminNumber', user.data.id);
        socket.on('adminNumberFirst', (array) => {
            setUsers(array);
            console.log('qq', array);
        });

        socket.on('adminRemoveNumber', (user) => {
            // users.map(item => item.user.);
            setUsers((preUsers) =>
                preUsers.map((preUser) => {
                    if (preUser.user._id === user) {
                        return {
                            ...preUser,
                            count: 0,
                            // time:
                        };
                    }
                    return preUser;
                }),
            );
        });

        socket.on('adminAddNumber', (data) => {
            setUsers((preUsers) => {
                const test = preUsers.some((item) => item.user._id === data.user._id);
                if (!test) {
                    return [data, ...preUsers];
                } else {
                    return preUsers
                        .map((preUser) => {
                            if (preUser.user._id === data.user._id) {
                                return {
                                    ...preUser,
                                    count: preUser.count + data.count,
                                    chat: data.chat,
                                };
                            }
                            return preUser;
                        })
                        .sort((a, b) => (a.user._id === data.user._id ? -1 : b.user._id === data.user._id ? 1 : 0));
                }
            });
        });

        socket.on('newMessAdmin', (data) => {
            // console.log(data.time);

            setUsers((preUsers) => {
                const test = preUsers.some((item) => item.user._id === data.user._id);
                console.log(test);

                if (!test) {
                    return [{ user: data.user, count: 0, chat: data.chat }, ...preUsers];
                } else {
                    return preUsers
                        .map((item) => {
                            if (item.user._id === data.user._id) {
                                return { user: item.user, count: item.count, chat: data.chat };
                            }
                            return item;
                        })
                        .sort((a, b) => (a.user._id === data.user._id ? -1 : 0));
                }
            });
        });

        return () => {
            socket.off('adminNumberFirst');
            socket.off('adminRemoveNumber');
            socket.off('adminAddNumber');
            socket.off('newMessAdmin');
            socket.disconnect();
        };
    }, [user, dispatch]);
    // console.log(users);

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
                                backgroundColor: selectUser === item.user._id ? '#d7d7d7' : 'transparent',
                                padding: '10px',
                            }}
                        >
                            <div onClick={() => setSelectUser(item.user._id)}>
                                <div className="d-flex align-items-center ">
                                    {item.user.avatar ? (
                                        <ImageBase
                                            pathImg={item.user.avatar}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            name={item.user.username.charAt(0)}
                                            size="40"
                                            round={true}
                                            color="gray"
                                        />
                                    )}
                                    <div style={{ width: '140px' }}>
                                        <h5 className="mb-0 ms-2">{item.user.username}</h5>
                                        <p
                                            className="mb-0 ms-2 text-long"
                                            style={{
                                                fontSize: '13px',
                                                color: 'gray',
                                                display: 'inline-block',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {item.chat.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {item.count > 0 && (
                                    <div className="text-center">
                                        <Badge
                                            // style={{ top: 0, position: 'absolute', transform: 'translate(-50%, 0%)' }}
                                            pill
                                            bg="danger"
                                        >
                                            {item.count}
                                        </Badge>
                                    </div>
                                )}
                                <div>{moment(item.chat.createdAt).format('HH:mm')}</div>
                            </div>
                        </div>
                    ))}
                </Col>
                <Col
                    xs={9}
                    style={{
                        height: '78vh',
                        border: '1px solid #d7d7d7',
                        borderTop: 'none',
                        backgroundColor: '#eef0f1',
                    }}
                >
                    <div style={{ height: '100%' }}>
                        {/* <div style={{ height: '100%', width: '1px', backgroundColor: 'gray' }}></div> */}
                        {selectUser ? (
                            <ChatBot receiver={selectUser} />
                        ) : (
                            <div>
                                <img src={img1} className="mx-auto d-block mt-5" height={350} alt="" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;
