import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Tag = () => {
    const {tagName} = useParams()
    const {data, pending, err} = useFetch("http://localhost:8000/post/get/"+tagName)

    console.log(tagName)
    return (
        <main>
            {pending && (<div>Loading...</div>)}
        </main>);
}

export default Tag;