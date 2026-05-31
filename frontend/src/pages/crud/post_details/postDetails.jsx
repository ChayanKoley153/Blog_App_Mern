import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../../../api/endpoints';
import { useList } from '../../../../customHooks/crudhooks/useList';
import "./style.css";

export const PostDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data,
        loading,
        error,
        getData
    } = useList(endPoints.crud.details(id));

    useEffect(() => {
        getData();
    }, []);

    const handleEdit = () => {
        navigate(`/product/edit/${id}`);
    };


    if (loading) {
        return <h2 className="loading">Loading...</h2>;
    }

    if (error) {
        return <h2 className="error">{error}</h2>;
    }

    return (
        <div className="details-container">

            <div className="details-card">

                <h1 className="details-heading">
                    Post Details
                </h1>

                <div className="details-item">
                    <span>Title :</span>
                    <p>{data?.title}</p>
                </div>

                <div className="details-item">
                    <span>Subtitle :</span>
                    <p>{data?.subtitle}</p>
                </div>

                <div className="details-item">
                    <span>Description :</span>
                    <p>{data?.content}</p>
                </div>

                <div className="btn-group">

                    <button
                        className="edit-btn"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>

                </div>

            </div>

        </div>
    );
};