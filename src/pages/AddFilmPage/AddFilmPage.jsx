import React, { useEffect, useState } from 'react';
// import { CCol, Form, CRow } from 'react-bootstrap';
// import ListGenre from '~/components/ListGenre/ListGenre';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { fomarts, modules, standardAge } from '~/constants';
import moment from 'moment';
import { detailGenre, listGenre } from '~/services/GenreService';
import { addFilm, detailFilm, updateFilm } from '~/services/FilmService';
import { useNavigate, useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import ReactPlayer from 'react-player';
import { detailDirector, listDirector } from '~/services/DirectorService';
import { detailPerformer, listPerformer } from '~/services/PerformerService';
import { useSelector } from 'react-redux';
import {
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CMultiSelect,
    CRow,
    CDatePicker,
} from '@coreui/react-pro';

const AddFilmPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const { id } = useParams();
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
                // console.log('aaa', data);
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
            if (await updateFilm(id, formData, user?.accessToken)) {
                navigate('/film');
            }
        } else {
            if (await addFilm(formData, user?.accessToken)) {
                navigate('/film');
            }
        }
    };
    console.log('aaa', genre);

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Phim</h5>
            <CForm>
                <CRow className="mb-3">
                    <CCol>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} phim</h6>
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
                                selected: genre.find((mini) => mini.value === item._id),
                            }))}
                        />
                        {/* <Select
                            id="genre"
                            isMulti
                            options={listGenres.map((item) => ({ value: item._id, label: item.name }))}
                            value={genre}
                            onChange={(value) => setGenre(value)}
                            classNamePrefix="react-select"
                            placeholder="Thể loại"
                        /> */}
                        {/* <div onClick={() => handleShowGenre()} className="button select">
                            Chọn
                        </div>
                        {genre.map((item, index) => (
                            <li key={index} className={`ms-3 ${index === 0 && 'mt-3'}`}>
                                {genreNames[item]}
                            </li>
                        ))} */}
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
                                selected: director.find((mini) => mini.value === item._id),
                            }))}
                        />
                    </CCol>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="performer">
                            Diễn viên <span style={{ color: 'red' }}>*</span>
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
                                selected: performer.find((mini) => mini.value === item._id),
                            }))}
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

            {/* <ListGenre show={showGenre} handleClose={handleCloseGenre} selected={genre} listSelect={handleGenre} /> */}
        </div>
    );
};

export default AddFilmPage;
