import { useEffect, useState } from "react";
import "./Forms.css";
import Uploaded from "./Uploaded";

const Upload = () => {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    likes: 0,
    views: 0,
    date: Date.now(),
    image: "",
  });

  const [imageFile, setImageFile] = useState({
    fileLocation: "",
    fileSize: "",
  });

  const [isSumbitted, setIsSubmitted] = useState("none");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setUserData((prev) => ({
      ...prev,
      image: file,
    }));
    setImageFile((prev) => ({
      ...prev,
      fileLocation: URL.createObjectURL(file),
    }));
    setImageFile((prev) => ({ ...prev, fileSize: e.target.files[0] }));
  };

  useEffect(() => {
    setImageFile((prev) => ({
      ...prev,
      fileLocation: "http://localhost:8000/uploads/no-img.png",
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData.image.name);
    console.log("tried to submit");

    if (
      imageFile.fileLocation !== "http://localhost:8000/uploads/no-img.png" &&
      isSumbitted === "none"
    ) {
      const formData = new FormData();
      formData.append("title", userData.title);
      formData.append("description", userData.description);
      formData.append("likes", userData.likes);
      formData.append("views", userData.views);
      formData.append("date", userData.date);
      formData.append("image", userData.image, userData.image.name);
      console.log(formData.get("image"));

      fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsSubmitted("block");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div style={{ display: isSumbitted }}>
        <Uploaded></Uploaded>
      </div>
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
          <section className="form-section">
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
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
          </section>
          <section className="form-section-preview">
            <div>Preview</div>
            <div
              className="form-upload-preview"
              style={{
                backgroundImage: `url(${imageFile.fileLocation})`,
              }}
            ></div>
          </section>
          <input className="form-input" type="submit" value="Submit" />
        </form>
      </main>
    </>
  );
};

export default Upload;
