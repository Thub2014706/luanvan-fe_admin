import { CCol, CDatePicker, CForm, CFormInput, CFormLabel, CFormSelect, CMultiSelect, CRow } from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fomarts, modules, standardAge } from '~/constants';
import { detailDirector, listDirector } from '~/services/DirectorService';
import { addFilm, detailFilm, updateFilm } from '~/services/FilmService';
import { detailGenre, listGenre } from '~/services/GenreService';
import { detailPerformer, listPerformer } from '~/services/PerformerService';
import ImageBase from '../ImageBase/ImageBase';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';

const AddFilm = ({ id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [time, setTime] = useState();
    const [nation, setNation] = useState('');
    const [genre, setGenre] = useState([]);
    const [listGenres, setListGenres] = useState([]);
    const [director, setDirector] = useState([]);
    const [listDirectors, setListDirectors] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [age, setAge] = useState('');
    const [performer, setPerformer] = useState([]);
    const [listPerformers, setListPerformers] = useState([]);
    const [image, setImage] = useState();
    const [imageEncode, setImageEncode] = useState();
    const [imageId, setImageId] = useState();
    const [trailer, setTrailer] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        const fetch = async () => {
            const data1 = await listGenre();
            setListGenres(data1);
            //
            const data2 = await listDirector();
            setListDirectors(data2);
            //
            const data3 = await listPerformer();
            setListPerformers(data3);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailFilm(id);
                setName(data.name);
                setTime(data.time);
                setNation(data.nation);
                const genreData = await Promise.all(data.genre.map(async (item) => await detailGenre(item)));
                setGenre(genreData.map((item) => ({ value: item._id, label: item.name })));
                const directorData = await Promise.all(data.director.map(async (item) => await detailDirector(item)));
                setDirector(directorData.map((item) => ({ value: item._id, label: item.name })));
                setReleaseDate(moment(data.releaseDate).format('YYYY-MM-DD'));
                setEndDate(moment(data.endDate).format('YYYY-MM-DD'));
                setAge(data.age);
                const performerData = await Promise.all(
                    data.performer.map(async (item) => await detailPerformer(item)),
                );
                setPerformer(performerData.map((item) => ({ value: item._id, label: item.name })));
                setImageId(data.image);
                setTrailer(data.trailer);
                setDescription(data.description);
                // console.log('aaa', genreData.map((item) => ({ value: item._id, label: item.name })));
            }
        };
        fetch();
    }, [id]);

    const handleImg = (e) => {
        const newFiles = e.target.files[0];
        setImage(newFiles);
        setImageEncode(URL.createObjectURL(newFiles));
        setImageId();
    };

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('time', time);
        formData.append('nation', nation);
        genre.forEach((g) => formData.append('genre', g.value));
        director.forEach((d) => formData.append('director', d.value));
        formData.append('releaseDate', releaseDate);
        formData.append('endDate', endDate);
        formData.append('age', age);
        performer.forEach((p) => formData.append('performer', p.value));
        if (imageId) {
            formData.append('imageId', imageId);
        } else {
            formData.append('image', image);
        }
        formData.append('trailer', trailer);
        formData.append('description', description);

        if (id) {
            if (await updateFilm(id, formData, user?.accessToken, axiosJWT)) {
                navigate('/film');
            }
        } else {
            if (await addFilm(formData, user?.accessToken, axiosJWT)) {
                navigate('/film');
            }
        }
    };
    return (
        <div>
            <CForm>
                <CRow className="mb-3 mt-4">
                    <CCol>
                        <h5 className="fw-bold">{id ? 'Cập nhật' : 'Thêm'} phim</h5>
                    </CCol>
                    <CCol>
                        <div className="button add float-end" onClick={handleAdd}>
                            Chấp nhận
                        </div>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="name">
                            Tên phim <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            name="name"
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên phim"
                        />
                    </CCol>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="time">
                            Thời lượng (phút) <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="time"
                            name="time"
                            value={time}
                            type="number"
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="Thời lượng (phút)"
                        />
                    </CCol>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="nation">
                            Quốc gia <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="nation"
                            name="nation"
                            value={nation}
                            onChange={(e) => setNation(e.target.value)}
                            type="text"
                            placeholder="Quốc gia"
                        />
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol xs={3}>
                        <CFormLabel className="fw-bold" htmlFor="releaseDate">
                            Ngày phát hành <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CDatePicker
                            footer
                            // locale="en-US"
                            id="releaseDate"
                            name="releaseDate"
                            date={releaseDate}
                            value={releaseDate}
                            onDateChange={(date) => setReleaseDate(date)}
                            placeholder="Ngày phát hành"
                        />
                    </CCol>
                    <CCol xs={3}>
                        <CFormLabel className="fw-bold" htmlFor="endDate">
                            Ngày kết thúc <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CDatePicker
                            footer
                            id="endDate"
                            name="endDate"
                            date={endDate}
                            value={endDate}
                            onDateChange={(date) => setEndDate(date)}
                            placeholder="Ngày kết thúc"
                        />
                    </CCol>
                    <CCol xs={6}>
                        <CFormLabel className="fw-bold" htmlFor="age">
                            Giới hạn độ tuổi <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormSelect id="age" value={age} name="age" onChange={(e) => setAge(e.target.value)}>
                            <option>Giới hạn độ tuổi</option>
                            {standardAge.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </CFormSelect>
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="genre">
                            Thể loại <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CMultiSelect
                            id="genre"
                            clearSearchOnSelect
                            value={genre}
                            onChange={(value) => setGenre(value)}
                            placeholder="Thể loại"
                            options={listGenres.map((item) => ({
                                value: item._id,
                                label: item.name,
                                selected: genre.some((mini) => mini.value === item._id),
                            }))}
                            virtualScroller
                        />
                    </CCol>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="director">
                            Đạo diễn <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CMultiSelect
                            id="director"
                            clearSearchOnSelect
                            value={director}
                            onChange={(value) => setDirector(value)}
                            placeholder="Đạo diễn"
                            options={listDirectors.map((item) => ({
                                value: item._id,
                                label: item.name,
                                selected: director.some((mini) => mini.value === item._id),
                            }))}
                            virtualScroller
                        />
                    </CCol>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="performer">
                            Diễn viên
                        </CFormLabel>
                        <CMultiSelect
                            id="performer"
                            clearSearchOnSelect
                            value={director}
                            onChange={(value) => setPerformer(value)}
                            placeholder="Diễn viên"
                            options={listPerformers.map((item) => ({
                                value: item._id,
                                label: item.name,
                                selected: performer.some((mini) => mini.value === item._id),
                            }))}
                            virtualScroller
                        />
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="image">
                            Hình ảnh <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="image"
                            name="image"
                            accept=".jpg, .png"
                            type="file"
                            placeholder="Hình ảnh"
                            onChange={(e) => handleImg(e)}
                        />
                        {image && <img src={imageEncode} alt="" style={{ height: '200px', marginTop: '20px' }} />}
                        {imageId && <ImageBase pathImg={imageId} style={{ height: '200px', marginTop: '20px' }} />}
                    </CCol>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="trailer">
                            Trailer <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="trailer"
                            name="trailer"
                            value={trailer}
                            onChange={(e) => setTrailer(e.target.value)}
                            type="url"
                            placeholder="Trailer"
                        />
                        {trailer && (
                            <ReactPlayer url={trailer} height="200px" width="400px" style={{ marginTop: '20px' }} />
                        )}
                    </CCol>
                </CRow>
            </CForm>
            <CRow className="mt-3">
                <CCol>
                    <CFormLabel className="fw-bold">
                        Mô tả <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        formats={fomarts}
                        placeholder="Viết mô tả..."
                    />
                </CCol>
            </CRow>
        </div>
    );
};

export default AddFilm;
