import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import "./Detail.css";

const PostDetail = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch("http://localhost:8000/post/" + id);
  console.log(data);
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
            <div>Still image title: {data.title}</div>
            <div>Description: {data.description}</div>
            <div className="detail-likes">
              <div>Views: {data.views}</div>
              <div>Upvotes: {data.likes}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostDetail;
