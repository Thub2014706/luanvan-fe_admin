import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { detailUserById } from '~/services/UserService';
import ImageBase from '../ImageBase/ImageBase';
import moment from 'moment';

const ChatList = ({ chats, receiver }) => {
    const endOfMessages = useRef();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetch = async () => {
            if (receiver) {
                const data = await detailUserById(receiver);
                setUser(data);
            }
        };
        fetch();
    }, [receiver]);

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chats_list">
            {user &&
                chats.map(
                    (item, index) =>
                        item.user === receiver &&
                        (item.senderType === false ? (
                            <div className="chat_sender my-2">
                                {/* <img src={item.avatar} alt="" /> */}
                                <p className="mb-0">
                                    {item.message}
                                    {((chats[index + 1] && chats[index + 1].senderType) || !chats[index + 1]) && (
                                        <>
                                            <br />
                                            <span className="text-end mb-0 text-secondary" style={{ fontSize: '12px' }}>
                                                {moment(item.createdAt).format('HH:mm')}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <div className="chat_receiver my-2">
                                {((chats[index - 1] && !chats[index - 1].senderType) || !chats[index - 1]) ?
                                    (user.avatar ? (
                                        <ImageBase
                                            pathImg={user.avatar}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <Avatar name={user.username.charAt(0)} size="40" round={true} color="gray" />
                                    )) : (
                                        <div style={{width: '40px'}}></div>
                                    )}
                                <p className="ms-2 mb-0">
                                    {item.message}
                                    {((chats[index + 1] && !chats[index + 1].senderType) || !chats[index + 1]) && (
                                        <>
                                            <br />
                                            <span className="text-end mb-0 text-secondary" style={{ fontSize: '11px' }}>
                                                {moment(item.createdAt).format('HH:mm')}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        )),
                )}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatList;
