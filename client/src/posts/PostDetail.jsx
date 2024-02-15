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
      behavior: "smooth"
    });
  };

  const handleLike = async () => {
    try {
      const result = await axios.put("http://localhost:8000/post/like", { id: postData.post._id })
      console.log(result)
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    getPostData();

  }, []);


  console.log(postData);
  return (
    <>
      {postData.post && (
        <div id="asd" className="Post-Detail">
          <main>
            <div className="detail-image-container">
              <div
                className="detail-image"
                id="#form"
                style={{
                  backgroundImage: `url("http://localhost:8000/uploads/${postData.post.img}")`,
                }}
              ></div>
            </div>
            <div className="detail-text">
              <div><h1>{postData.post.title}</h1></div>
              <div className="detail-descripton">{postData.post.desc}</div>
              <div className="detail-reaction">
                <div>Views: {postData.post.views}</div>
                <div onClick={handleLike}>Likes: {postData.post.likes}</div>
              </div>
              <div className="detail-creator">
                <span>Created by:</span>
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
            </div>
          </main >
        </div >
      )}
    </>
  );
};

export default PostDetail;
