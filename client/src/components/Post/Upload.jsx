import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    likes: 0,
    views: 0,
    date: Date.now(),
    image: "",
    creator: "",
    tags: [],
  });

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === 'Enter') {
      const newTag = e.target.value.trim();
      if (newTag) {
        setUserData((prev) => ({ ...prev, tags: [...userData.tags, newTag] }));
      }

      e.target.value = "";
    }
  };

  const handleTagDelete = (item) => {
    console.log(item);
    setUserData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== item),
    }));
  };

  const memoUrl = useMemo(() => {
    if (userData.image) {
      return URL.createObjectURL(userData.image);
    }
  }, [userData.image]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData) {
      const formData = new FormData();
      formData.append("title", userData.title);
      formData.append("desc", userData.description);
      formData.append("likes", userData.likes);
      formData.append("views", userData.views);
      formData.append("date", userData.date);
      formData.append("img", userData.image, userData.image.name);
      formData.append("tags", JSON.stringify(userData.tags));
      try {
        const result = await axios.post(
          "http://localhost:8000/post/",
          formData
        );
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    navigate("/uploaded");
  };

  const handleAvatarDelete = () => {
    setUserData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  /*<div className="form-upload-preview"
                style={{
                  backgroundImage: `url(${memoUrl})`
                }}>
              </div>} */

  console.log(userData);

  return (
    <>
      <main className="form-main">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-section-img">
            <div>
              <div>Choose your image:</div>
            </div>
            <div className="upload-avatar-container">
              <label className="upload-btn" htmlFor="file"></label>
              <input
                required
                className="upload-btn-hidden"
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />
              <input
                type="button"
                value="X"
                className="delete-avt"
                onClick={handleAvatarDelete}
              />
            </div>
          </div>
          <div className="form-section">
            <div className="form-input-title-img"></div>
            <input

              className="form-input"
              required
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="form-section">
            <div className="form-input-desc-img"></div>
            <textarea
              className="form-input"
              required
              type="text"
              placeholder="Description"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <div className="form-section">
            <input
              type="text"
              placeholder="Add tags (optional)"
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <p>Tags:</p>
            <div className="tags-field">
              {userData.tags.map((i, index) => (
                <div
                  className="upload-tag"
                  key={index}
                  onClick={(e) => handleTagDelete(i)}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <div className="form-section-preview">
            <div>Preview</div>
            {userData.image && (
              <img
                src={memoUrl}
                width="400px"
                className="form-upload-preview"
                alt=""
              />
            )}
          </div>
          <input className="form-input" type="submit" value="Submit" />
        </form>
      </main>
    </>
  );
};

export default Upload;
