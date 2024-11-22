import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { detailUserById } from '~/services/UserService';
import ImageBase from '../ImageBase/ImageBase';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

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
                            <>
                                {/* thoi gian center */}
                                <p
                                    className="mx-auto px-3 my-3"
                                    style={{
                                        borderRadius: '10px',
                                        backgroundColor: 'rgb(219, 219, 219)',
                                        color: 'gray',
                                        width: 'fit-content',
                                    }}
                                >
                                    {(!chats[index - 1] ||
                                        momentTimezone
                                            .tz(chats[index - 1].createdAt, 'Asia/Ho_Chi_Minh')
                                            .add(30, 'minutes')
                                            .isBefore(momentTimezone.tz(item.createdAt, 'Asia/Ho_Chi_Minh'))) && (
                                        <p>{moment(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                                    )}
                                </p>
                                {/* chat */}
                                <div className="chat_sender my-2">
                                    {/* <img src={item.avatar} alt="" /> */}
                                    <p className="mb-0">
                                        {item.message}
                                        {((chats[index + 1] &&
                                            (chats[index + 1].senderType ||
                                                momentTimezone
                                                    .tz(item.createdAt, 'Asia/Ho_Chi_Minh')
                                                    .add(30, 'minutes')
                                                    .isBefore(
                                                        momentTimezone.tz(
                                                            chats[index + 1].createdAt,
                                                            'Asia/Ho_Chi_Minh',
                                                        ),
                                                    ))) ||
                                            !chats[index + 1]) && (
                                            <>
                                                <br />
                                                <span
                                                    className="text-end mb-0 text-secondary"
                                                    style={{ fontSize: '12px' }}
                                                >
                                                    {moment(item.createdAt).format('HH:mm')}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p
                                    className="mx-auto px-3 my-3"
                                    style={{
                                        borderRadius: '10px',
                                        backgroundColor: 'rgb(219, 219, 219)',
                                        color: 'gray',
                                        width: 'fit-content',
                                    }}
                                >
                                    {(!chats[index - 1] ||
                                        momentTimezone
                                            .tz(chats[index - 1].createdAt, 'Asia/Ho_Chi_Minh')
                                            .add(30, 'minutes')
                                            .isBefore(momentTimezone.tz(item.createdAt, 'Asia/Ho_Chi_Minh'))) && (
                                        <p>{moment(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                                    )}
                                </p>
                                <div className="chat_receiver my-2">
                                    {(chats[index - 1] &&
                                        (!chats[index - 1].senderType ||
                                            momentTimezone
                                                .tz(chats[index - 1].createdAt, 'Asia/Ho_Chi_Minh')
                                                .add(30, 'minutes')
                                                .isBefore(momentTimezone.tz(item.createdAt, 'Asia/Ho_Chi_Minh')))) ||
                                    !chats[index - 1] ? (
                                        user.avatar ? (
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
                                            <Avatar
                                                name={user.username.charAt(0)}
                                                size="40"
                                                round={true}
                                                color="gray"
                                            />
                                        )
                                    ) : (
                                        <div style={{ width: '40px' }}></div>
                                    )}
                                    <p className="ms-2 mb-0">
                                        {item.message}
                                        {((chats[index + 1] &&
                                            (chats[index + 1].senderType === false ||
                                                momentTimezone
                                                    .tz(item.createdAt, 'Asia/Ho_Chi_Minh')
                                                    .add(30, 'minutes')
                                                    .isBefore(
                                                        momentTimezone.tz(
                                                            chats[index + 1].createdAt,
                                                            'Asia/Ho_Chi_Minh',
                                                        ),
                                                    ))) ||
                                            !chats[index + 1]) && (
                                            <>
                                                <br />
                                                <span
                                                    className="text-end mb-0 text-secondary"
                                                    style={{ fontSize: '11px' }}
                                                >
                                                    {moment(item.createdAt).format('HH:mm')}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </>
                        )),
                )}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatList;
