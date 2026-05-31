import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import endPoints from "../../../../api/endpoints";
import { useDelete } from "../../../../customHooks/crudhooks/useDelete";
import "./style.css";
import {
    confirmDeleteAlert,
    successAlert,
    errorAlert
} from "../../../components/swalAlert/swalAlert.js";

export const PostDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, deleteData } = useDelete(
        endPoints.crud.delete(id)
    );

    const handleDelete = async () => {
        const result = await confirmDeleteAlert();

        if (result.isConfirmed) {
            const response = await deleteData();
            if (response) {
                await succes
                sAlert(
                    "Deleted!",
                    "Your file has been deleted."
                );

                navigate("/product/list");
            } else {
                errorAlert(
                    "Delete Failed",
                    "Unable to delete product"
                );
            }
        }
    };

    return (
        <div className="delete-box">
            <h2>Delete Post</h2>

            <button
                className="delete-btn"
                onClick={handleDelete}
            >
                {loading ? "Deleting..." : "Delete"}
            </button>
        </div>
    );
};