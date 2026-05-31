import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useList } from "../../../../customHooks/crudhooks/useList";
import endPoints from "../../../../api/endpoints";
import "./style.css";

export const PostList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetched = useRef(false);

  const { data, loading, error, getData } = useList(
    endPoints.crud.list
  );

  useEffect(() => {
    if (!fetched.current) {
      getData();
      fetched.current = true;
    }

  }, []);

  const handleDetails = (id) => {
    navigate(`/product/details/${id}`);
    console.log(id);
  };

  const handleDelete = (id) => {
    navigate(`/product/delete/${id}`);
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <>
      <Link to="/product/add" style={{ display: "inline-block", margin: "10px 0" }}>
        Add Post
      </Link>
      <div className="post-container">
        {!loading && Array.isArray(data) && data.length === 0 ? (
          <h2 className="no-post">
            No Posts Found
          </h2>
        ) : (
          [...data].reverse().map((post, index) => (
            <div
              className="post-card"
              key={post._id}
            >
              <div className="post-top">
                <span className="post-index">
                  #{index + 1}
                </span>
              </div>

              <h2 className="post-title">
                {post.title}
              </h2>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() =>
                    handleDetails(post._id)
                  }
                >
                  View Details
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>

  );
};