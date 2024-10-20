import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatList from '../ChatList/ChatList';
import InputText from '../InputText/InputText';
import { detailUserById } from '~/services/UserService';
import ImageBase from '../ImageBase/ImageBase';
import Avatar from 'react-avatar';

const ChatBot = ({ receiver }) => {
    const socket = io(process.env.REACT_APP_API_URL);
    const [chats, setChats] = useState([]);
    const [detailDeceiver, setDetailDeceiver] = useState();

    useEffect(() => {
        const fetch = async () => {
            if (receiver) {
                const data = await detailUserById(receiver);
                setDetailDeceiver(data);
            }
        };
        fetch();
    }, [receiver]);

    useEffect(() => {
        if (receiver) {
            socket.emit('adminJoin', receiver);

            socket.on('chat', (listChat) => {
                setChats(listChat);
            });

            socket.on('message', (msg) => {
                setChats((pre) => [...pre, msg]);
            });

            return () => {
                socket.off('chat');
                socket.off('message');
                socket.emit('leave', receiver)
            };
        }
    }, [receiver]);

    const addMessage = (chat) => {
        if (chat && chat !== '') {
            const newChat = { user: receiver, message: chat, senderType: false };
            socket.emit('newMessage', newChat);
        }
    };

    return (
        <div className="chat-container">
            <div className="header-chat">
                <h5 className="mb-0">
                    {detailDeceiver && (
                        <>
                            {detailDeceiver.avatar ? (
                                <ImageBase
                                    pathImg={detailDeceiver.avatar}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Avatar name={detailDeceiver.username.charAt(0)} size="50" round={true} color="gray" />
                            )}
                            <span className='ms-2'>{detailDeceiver.username}</span>
                        </>
                    )}
                </h5>
            </div>
            <ChatList chats={chats} receiver={receiver} />
            <InputText addMessage={addMessage} />
        </div>
    );
};

export default ChatBot;
