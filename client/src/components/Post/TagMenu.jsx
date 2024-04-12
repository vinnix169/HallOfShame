import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/TagMenu.scss"



const TagMenu = ({ isActive }) => {

    const [tag, setTag] = useState([])

    console.log(isActive)

    useEffect(() => {
        axios.get("http://localhost:8000/post/tags")
            .then((res) => {
                const newTag = Object.keys(res.data).map((key) => ({
                    tag: key,
                    img: [...res.data[key]]
                }));

                setTag(newTag);

            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div className="tag-menu">
            {isActive &&
                <div>
                    <div className="tag-menu-body">
                        <h1>Tags</h1>
                        <ul className="tag-list-holder">
                            {tag.map((i, index) => (
                                <li className="tag-list-item">#{i.tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
        </div>);
}

export default TagMenu;