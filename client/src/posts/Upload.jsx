import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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
  });

  const memoUrl = useMemo(() => {
    if (userData.image) {
      return URL.createObjectURL(userData.image)
    }
  }, [userData.image])


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("title", userData.title);
    formData.append("desc", userData.description);
    formData.append("likes", userData.likes);
    formData.append("views", userData.views);
    formData.append("date", userData.date);
    formData.append("img", userData.image, userData.image.name);
    console.log(formData.get("image"));
    try {
      const result = await axios.post("http://localhost:8000/post/", formData)
      console.log(result)
    } catch (error) {
      console.error(error)
    }

    navigate("/uploaded");
  };

  return (
    <>
      <main className="form-main">
        <form onSubmit={(e) => handleSubmit(e)}>
          <section className="form-section">
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
          </section>
          <section className="form-section" >
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
          </section>
          <section className="form-section-img">
            <div>
              <div>Choose your image:</div>
            </div>
            <div>
              <label className="upload-btn" htmlFor="file"></label>
              <input
                className="upload-btn-hidden"
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setUserData((prev) => ({ ...prev, image: e.target.files[0] }))}
              />
            </div>
          </section>
          <section className="form-section-preview">
            <div>Preview</div>
            {userData.image &&
              <div className="form-upload-preview"
                style={{
                  backgroundImage: `url(${memoUrl})`
                }}>
              </div>}
          </section>
          <input className="form-input" type="submit" value="Submit" />
        </form>
      </main >
    </>
  );
};

export default Upload;
