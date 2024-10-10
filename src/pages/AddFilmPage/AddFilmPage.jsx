import React, { useEffect, useState } from 'react';

import { CCol, CRow } from '@coreui/react-pro';
import { useParams } from 'react-router-dom';
import AddFilm from '~/components/AddFilm/AddFilm';
import AllComment from '~/components/AllComment/AllComment';
import { listCommentByFilm } from '~/services/CommentService';

const AddFilmPage = () => {
    const { id } = useParams();
    const [sumCom, setSumCom] = useState(0);
    const [step, setStep] = useState(1);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await listCommentByFilm(id);
                setComments(data);
                setSumCom(data.length);
            }
        };
        fetch();
    }, [id]);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <AddFilm id={id} />;
            case 2:
                return <AllComment comments={comments} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Phim</h5>
            {id ? (
                <div>
                    <CRow>
                        <CCol
                            className="pb-2"
                            xs="auto"
                            style={{
                                borderBottom: step === 1 ? '2px solid #264c9a' : '1px solid gray',
                                color: step === 1 ? '#264c9a' : 'black',
                                cursor: 'pointer',
                            }}
                            onClick={() => setStep(1)}
                        >
                            Chỉnh sửa phim
                        </CCol>
                        <CCol
                            className="pb-2"
                            xs="auto"
                            style={{
                                borderBottom: step === 2 ? '2px solid #264c9a' : '1px solid gray',
                                color: step === 2 ? '#264c9a' : 'black',
                                cursor: 'pointer',
                            }}
                            onClick={() => setStep(2)}
                        >
                            Đánh giá phim ({sumCom})
                        </CCol>
                        <CCol className="pb-2" style={{ borderBottom: '1px solid gray' }}></CCol>
                    </CRow>
                    <div>{renderStep(step)}</div>
                </div>
            ) : (
                <div>
                    <AddFilm />
                </div>
            )}
        </div>
    );
};

export default AddFilmPage;
