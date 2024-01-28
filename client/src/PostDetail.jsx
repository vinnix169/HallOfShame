import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import "./Detail.css";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch("http://localhost:8000/post/" + id);
  console.log(data);
  const [displayDate, setDisplayedDate] = useState("");

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

  useEffect(() => {
    if (data != null) {
      convertDate();
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
            <div>{data.title}</div>
            <div>Description:</div>
            <div>{data.description}</div>
            <div className="detail-likes">
              <div>Views: {data.views}</div>
              <div>Likes: {data.likes}</div>
              <div>Added:{displayDate}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostDetail;
