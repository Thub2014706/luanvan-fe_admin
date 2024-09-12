import React, { useEffect, useState } from 'react';
import ImageBase from '../ImageBase/ImageBase';
import { detailFilm } from '~/services/FilmService';

const FilmTitle = ({ id }) => {
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailFilm(id);
            setFilm(data);
        };
        fetch();
    }, [id]);
    
    return (
        film !== null && (
            <div className="card-film">
                <ImageBase
                    pathImg={film.image}
                    style={{
                        height: '250px',
                        width: '190px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'flex',
                        objectFit: 'cover',
                    }}
                />
                <h6 className="text-center mt-4 fw-bold">{film.name.toUpperCase()}</h6>
            </div>
        )
    );
};

export default FilmTitle;
