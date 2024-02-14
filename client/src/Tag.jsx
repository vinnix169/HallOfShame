import { useParams } from "react-router-dom";


const Tag = () => {
    const { tagName } = useParams()

    console.log(tagName)
    return (
        <main>

        </main>);
}

export default Tag;