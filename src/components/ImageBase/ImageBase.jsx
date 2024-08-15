import React, { useEffect, useState } from 'react';
import { getImage } from '~/services/FilmService';

const ImageBase = ({ pathImg, style }) => {
    const [img, setImg] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const data = await getImage(pathImg);
            setImg(data);
        };
        fetch();
    }, [pathImg]);
    return img !== null && <img src={img} style={style} />;
};

export default ImageBase;
