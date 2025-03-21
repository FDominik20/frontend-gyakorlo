import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const HalakListPage = () => {
    const [halak, setHalak] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get('https://halak.onrender.com/api/Halak')
            .then((res) => setHalak(res.data))
            .catch(console.error)
            .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Halak listája</h2>
                    {halak.map((hal, index) => (
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Hal neve: {hal.name}</p>
                            <p className="text-danger">Leírás: {hal.description}</p>
                            <div className="card-body">
                                {hal.image && <img alt={hal.name} className="img-fluid" style={{ maxHeight: 200 }} src={URL.createObjectURL(new Blob([new Uint8Array(hal.image.data)], { type: 'image/jpeg' }))} />}
                                <br />
                                <NavLink to={'/hal/' + hal.id} className="btn btn-primary mt-2">Részletek</NavLink>
                                <NavLink to={'/edit-hal/' + hal.id} className="btn btn-secondary mt-2 ms-2">
                                    <i className="bi bi-pencil"></i>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
