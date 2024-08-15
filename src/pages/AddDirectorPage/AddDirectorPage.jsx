import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { fomarts, modules } from '~/constants';
import { addDirector, detailDirector, updateDirector } from '~/services/DirectorService';
import ImageBase from '../../components/ImageBase/ImageBase';
import Avatar from 'react-avatar';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const AddDirectorPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [birth, setBirth] = useState();
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarBase, setAvatarBase] = useState();
    const [avatarId, setAvatarId] = useState();

    // console.log('dd', id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (birth) {
            formData.append('birth', birth);
        }
        if (description) {
            formData.append('description', description);
        }
        if (avatarId) {
            formData.append('avatarId', avatarId);
        } else {
            formData.append('avatar', avatar);
        }
        if (id) {
            if (await updateDirector(id, formData)) {
                navigate('/director');
            }
        } else {
            if (await addDirector(formData)) {
                navigate('/director');
            }
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailDirector(id);
                setName(data.name);
                data.birth && setBirth(moment(data.birth).format('YYYY-MM-DD'));
            }
        };
        fetch();
    }, [id]);

    const handleAvatar = (e) => {
        const img = e.target.files[0];
        setAvatar(img);
        setAvatarBase(URL.createObjectURL(img));
        setAvatarId();
    };

    // const [src, setSrc] = useState(null);
    // const onClose = () => {
    //     setAvatar(null);
    // };

    // const onCrop = (view) => {
    //     setAvatar(view);
    //     console.log(view);

    // };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Đạo diễn</h5>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} đạo diễn</h6>
                    </Col>
                    <Col>
                        <div className="button add float-end" onClick={handleSubmit}>
                            Chấp nhận
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className="fw-bold">Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            name="avatar"
                            multiple
                            accept=".jpg, .png"
                            onChange={(e) => handleAvatar(e)}
                            className="mb-3"
                        />
                        {avatar && <Avatar src={avatarBase} round={true} alt="" />}
                        {avatarId && (
                            <ImageBase
                                pathImg={avatarId}
                                style={{ height: '100px', width: '100px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        )}
                        {!avatar && !avatarId && <Avatar name={name} round={true} />}
                    </Col>
                    <Col>
                        <Form.Label className="fw-bold">
                            Họ Tên <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Họ tên"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Label className="fw-bold">Ngày sinh</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ngày sinh"
                            name="birth"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Label className="fw-bold">Mô tả</Form.Label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                            formats={fomarts}
                            placeholder="Viết mô tả..."
                        />
                    </Col>
                </Row>
                {/* <Row className="mt-3">
                    
                </Row> */}
                {/* <Avatar width={200} height={200} onCrop={onCrop} onClose={onClose} src={src} />
                        {avatar && <img src={avatar} alt="" />} */}
            </Form>
        </div>
    );
};

export default AddDirectorPage;
