import React from 'react';
import ImageBase from '../ImageBase/ImageBase';

const FilmTitle = ({ image, name }) => {
    return (
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
    );
};

export default FilmTitle;
