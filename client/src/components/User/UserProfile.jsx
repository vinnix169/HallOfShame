import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/UserProfile.scss"

const UserProfile = () => {

    const { id } = useParams();
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/user/" + id).then((res) => setData(res.data))
    }, [])

    console.log(data.avatar)

    return (<main>
        {data && <div className="user-header">
            <div className="user-avatar-holder"><div style={{
                backgroundImage: `url("http://localhost:8000/uploads/${data.avatar}")`
            }} className="user-avatar"></div></div>

            <div className="user-desc-holder">
                <h1>{`${data.username}#${data.userTag}`}</h1>
                <p>About me:</p>
                <div className="about-me-section">
                    {!data.about && <p>Nothing</p>}
                    {data.about && <p>{data.about}</p>}
                </div>
            </div>
        </div>}
    </main>);
}

export default UserProfile;