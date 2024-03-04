import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UseScroll from "../lib/UseScroll";

const PostDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState([]);

  const getPostData = async () => {
    try {
      const { data: getPost } = await axios.get(
        "http://localhost:8000/post/" + id
      );
      setPostData(getPost.data);
    } catch (err) {
      console.log(err);
    }
    window.scrollTo({
      top: 80,
      behavior: "smooth",
    });
  };

  const handleLike = async () => {
    try {
      const result = await axios.put("http://localhost:8000/post/like", {
        id: postData.post._id,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  /*<div
                  className="detail-image"
                  id="#form"
                  style={{
                    backgroundImage: `url("http://localhost:8000/uploads/${postData.post.img}")`,
                  }}
                ></div>*/

  console.log(postData);
  return (
    <>
      {postData.post && (
        <main>
          <div className="detail-image-container">
            <img
              src={`http://localhost:8000/uploads/${postData.post.img}`}
              className="detail-img"
              alt=""
            />
          </div>
          <div className="detail-text">
            <h1>{postData.post.title}</h1>
            <p className="detail-descripton">{postData.post.desc}</p>
            <div className="detail-ana">
              <div>Views: {postData.post.views}</div>
              <div onClick={handleLike}>Likes: {postData.post.likes}</div>
            </div>
            <span>Created by:</span>
            <div className="detail-creator">
              <Link to="/user/:id">
                <div
                  className="detail-creator-avt"
                  style={{
                    backgroundImage: `url("http://localhost:8000/uploads/${postData.user.avatar}")`,
                  }}
                ></div>
                <span>{postData.user.username}</span>
              </Link>
            </div>
            <div className="tags-field">
              {postData.post.tags.map((i, index) => (
                <div className="tags" key={index}>
                  {i}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PostDetail;
