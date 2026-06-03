import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./style.css";
import { useList } from '../../../../customHooks/crudhooks/useList';
import { useUpdate } from '../../../../customHooks/crudhooks/useEdit';
import endpoints from '../../../../api/endpoints.js';




export const PostEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data,
        getData
    } = useList(endpoints.crud.details(id));

    const {
        loading,
        error,
        updateData
    } = useUpdate(endpoints.crud.update(id));

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        content: ""
    });

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {

        if (data) {
            setFormData({
                title: data.title || "",
                subtitle: data.subtitle || "",
                content: data.content || ""
            });
        }

    }, [data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateData(formData);
        navigate("/product/list");
    };

    const handleCancel = () => {
        navigate("/product/list");
    };

    return (
        <>
            <div className="edit-container">
                <form
                    className="edit-form"
                    onSubmit={handleSubmit}
                >
                    <h1>Edit Post</h1>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="subtitle"
                        placeholder="Enter subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />

                    <textarea
                        name="content"
                        placeholder="Enter content"
                        rows="6"
                        value={formData.content}
                        onChange={handleChange}
                    />

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}


                    <div className="btn-group">
                        <button type="submit">
                            {loading
                                ? "Updating..."
                                : "Update Post"}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>
                </form>

            </div>
        </>

    );
};