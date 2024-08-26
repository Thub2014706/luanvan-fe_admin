import React, { useEffect, useState } from 'react';

const Name = ({ id, detail }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const data = await detail(id);
            setName(data.name);
        };
        fetch();
    }, [id, detail]);
    return <span>{name}</span>;
};

export default Name;
