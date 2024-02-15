import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
  };

  useEffect(() => {
    getPostData();
  }, []);
  console.log(postData);
  return (
    <>
      {postData.post && (
        <div className="Post-Detail">
          <main>
            <div
              className="detail-image"
              style={{
                backgroundImage: `url("http://localhost:8000/uploads/${postData.post.img}")`,
              }}
            ></div>
            <div className="detail-text">
              <div>{postData.post.title}</div>
              <div>{postData.post.desc}</div>
              <div className="detail-reaction">
                <div>Views: {postData.post.views}</div>
                <div>Likes: {postData.post.likes}</div>
              </div>
              <div className="detail-creator">
                Created by:
                <div
                  className="detail-creator-avt"
                  style={{
                    backgroundImage: `url("http://localhost:8000/uploads/${postData.user.avatar}")`,
                  }}
                ></div>
                {postData.user.username}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PostDetail;
