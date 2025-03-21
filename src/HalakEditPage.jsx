import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const HalakEditPage = () => {
    const { halId } = useParams();
    const navigate = useNavigate();
    const [hal, setHal] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        const fetchHalData = async () => {
            try {
                const response = await axios.get(`https://halak.onrender.com/api/Halak/${halId}`);
                setHal(response.data);
            } catch (error) {
                console.log('Hiba a hal adatok lekérdezésekor:', error);
            }
        };

        fetchHalData();
    }, [halId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHal((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://halak.onrender.com/api/Halak/${halId}`, hal)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log('Hiba a hal adatainak módosításakor:', error);
            });
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Hal módosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Hal neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" value={hal.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Leírás:</label>
                    <div className="col-sm-9">
                        <textarea name="description" className="form-control" value={hal.description} onChange={handleInputChange}></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Mentés</button>
            </form>
        </div>
    );
};
