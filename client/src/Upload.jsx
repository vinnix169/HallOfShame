import { useState } from "react";
import "./Forms.css";

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

  const handleImageUpload = async (e) => {
    setUserData((prev) => ({ ...prev, image: e.target.files[0].name }));
    setImageFile((prev) => ({
      ...prev,
      fileLocation: URL.createObjectURL(e.target.files[0]),
    }));
    setImageFile((prev) => ({ ...prev, fileSize: e.target.files[0] }));
  };

  console.log(userData);
  console.log(imageFile);
  return (
    <main className="form-main">
      <form action="submit">
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
              setUserData((prev) => ({ ...prev, description: e.target.value }))
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
        <input
          className="form-input"
          type="button"
          value="Submit"
          onSubmit={"a"}
        />
      </form>
    </main>
  );
};

export default Upload;
