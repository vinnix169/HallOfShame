import { Navigate, useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import "./Detail.css";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch(
    "http://localhost:8000/post/get/" + id
  );
  const [displayDate, setDisplayedDate] = useState("");
  const [displayLikes, setDisplayedLike] = useState(0);
  const navigateDeleted = useNavigate();

  const convertDate = () => {
    const originalDate = new Date(data.date);

    const formattedDate = `${originalDate.getFullYear()}.${
      originalDate.getMonth() + 1
    }.${originalDate.getDate()} ${originalDate.getHours()}:${
      (originalDate.getMinutes() < 10 ? "0" : "") + originalDate.getMinutes()
    }`;
    console.log(originalDate);
    setDisplayedDate(formattedDate);

    //set date for sortedData here
  };

  const handleDelete = () => {
    fetch("http://localhost:8000/post/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("Post deleted successfully");
          // Handle any additional logic after successful deletion
        } else {
          console.error("Failed to delete post");
        }
      })
      .catch((err) => console.error(err));
    navigateDeleted("/deleted");
  };

  const handleLike = () => {
    const formData = new FormData();
    formData.append("likes", data.likes + 1);
    setDisplayedLike(data.likes + 1);

    fetch("http://localhost:8000/post/updateLikes/" + id, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (data != null) {
      convertDate();
      setDisplayedLike((prev) => data.likes);

      const formData = new FormData();
      formData.append("views", data.views + 1);

      fetch("http://localhost:8000/post/updateViews/" + id, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.error(err));
    }
  }, [data]);

  return (
    <main>
      {pending && <div>Loading...</div>}
      {data && (
        <div className="detail-container">
          <div
            className="detail-image"
            style={{
              backgroundImage: `url("http://localhost:8000/uploads/${data.image}")`,
            }}
          ></div>
          <div className="detail-desc">
            <h3>{data.title}</h3>
            <div className="description-box">
              <h4>Description:</h4>
              <div>{data.description}</div>
            </div>
            <div className="detail-likes">
              <div className="like-container">
                <div>Likes: {displayLikes}</div>
                <input
                  type="button"
                  value=""
                  className="like"
                  onClick={handleLike}
                />
              </div>

              <div>Views: {data.views}</div>
            </div>
            <div>Added: {displayDate}</div>
          </div>
          <div className="detail-delete-container">
            <input type="button" value="Delete" onClick={handleDelete} />
          </div>
        </div>
      )}
    </main>
  );
};

export default PostDetail;
