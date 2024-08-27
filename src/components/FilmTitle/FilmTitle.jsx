import React from 'react';
import ImageBase from '../ImageBase/ImageBase';
import { Link } from 'react-router-dom';

const FilmTitle = ({ image, name, id }) => {
    return (
        <Link to={`/book-tickets/${id}`}>
            <div className="card-film">
                <ImageBase
                    pathImg={image}
                    style={{
                        height: '250px',
                        width: '190px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'flex',
                        objectFit: 'cover',
                    }}
                />
                <h6 className="text-center mt-4 fw-bold">{name.toUpperCase()}</h6>
            </div>
        </Link>
    );
};

export default FilmTitle;
