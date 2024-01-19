import { useState } from "react";
import './Forms.css'


const Upload = () => {
    const [userData, setUserData] = useState({
        email:String,
        username:String,
        password:String,
        avatar:String
    })

    return ( 
        <main className="form-main">
            <form action="submit">
                <section className="form-section">
                    <div className="form-input-title-img"></div>
                    <input className="form-input" required type="text" placeholder="Title"/>
                </section>
                <section className="form-section">
                <div className="form-input-desc-img"></div>
                    <textarea className="form-input" required type="text" placeholder="Description"></textarea>
                </section>
                <section className="form-section-img">
                    <div>
                        <div>Choose your image:</div>
                    </div>
                    <div>
                        <label className="upload-btn" htmlFor="file"></label>
                        <input className="upload-btn-hidden" 
                        id="file"  
                        type="file"
                        accept="image/*"/>
                    </div>
                </section>
                <section className="form-section-preview">
                    <div>Preview</div>
                    <div className="form-upload-preview">
                        <div className="form-upload-preview-img"></div>
                    </div>
                </section>
                <input className="form-input"
                    type="button"  
                    value="Submit" 
                    onSubmit={"a"}/>
            </form>
        </main>
     );
}
 
export default Upload;