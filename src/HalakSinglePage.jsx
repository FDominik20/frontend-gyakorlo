import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export const HalakSinglePage = () => {
    const { halId } = useParams();
    const [hal, setHal] = useState(null);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get(`https://halak.onrender.com/api/Halak/${halId}`)
            .then((res) => setHal(res.data))
            .catch(console.error)
            .finally(() => setPending(false));
    }, [halId]);

    const getImageUrl = (blob) => {
        const binary = new Uint8Array(blob.data);
        const blobData = new Blob([binary.buffer], { type: 'image/jpeg' });
        return URL.createObjectURL(blobData);
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !hal ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Hal neve: {hal.name}</h5>
                        <div className="lead">Leírás: {hal.description}</div>
                        {hal.image && <img alt={hal.name} className="img-fluid" style={{ maxHeight: 200 }} src={getImageUrl(hal.image)} />}
                    </div>
                    <div>
                        <NavLink to="/"><i className="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
                        <NavLink to={`/edit-hal/${hal.id}`}><i className="bi bi-pencil"></i></NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};
