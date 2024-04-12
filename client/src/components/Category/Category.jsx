import axios from "axios";
import UseScroll from "../../lib/UseScroll";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import reportWebVitals from "../../reportWebVitals";

const Category = () => {

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [userMessage, setUserMessage] = useState("");
    const [userSearchInput, setUserSearchInput] = useState("");
    const itemsPerPage = 16;
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const getTag = () => {
        const rawURL = decodeURIComponent(window.location.pathname)
        const tag = rawURL.split("/")[2]
        return tag
    }

    useEffect(() => {
        axios.get("http://localhost:8000/post/tags/" + getTag())
            .then((res) => setData(res.data)).catch((err) => console.error(err))
    }, []);



    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        UseScroll("#root", "#pagination", 1000, "easeOutQuint");
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }



    console.log(data)
    return (

        <main>
            <div className="search-element">
                <input
                    type="search"
                    placeholder="Search..."
                    onChange={(e) => setUserSearchInput(e.target.value)}
                />
            </div>

            <div className="feed-header">
                <h1>{userMessage}</h1>
                <h1>{"Pictures found with #" + getTag()}</h1>
                {data && <div className="feed-header-group">
                    <ReactPaginate
                        id="pagination"
                        activeClassName={"item active "}
                        breakClassName={"item break-me "}
                        breakLabel={"..."}
                        containerClassName={"pagination"}
                        disabledClassName={"disabled-page"}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={">"}
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(data.length / itemsPerPage)}
                        pageClassName={"item pagination-page "}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={"<"}
                        forcePage={currentPage}
                    />
                </div>}
            </div>
            <div className="feed-grid">
                {data && data
                    .filter((item) =>
                        item.title.toLowerCase().includes(userSearchInput)
                    )
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((element, index) => (
                        <div key={index} className="feed-card">
                            <Link
                                to={`/categories/${element.tag}`}

                            >
                                <div className="feed-thumbnail-holder">
                                    <div
                                        className="feed-thumbnail"
                                        style={{
                                            backgroundImage:
                                                `url("http://localhost:8000/uploads/thumbnail/thumbnail-${element.img}")`,
                                        }}
                                    ></div>
                                </div>
                                <div className="feed-text">
                                    <h3 className="feed-title">{element.title}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
            <div className="result-pagination">
                {data && <ReactPaginate
                    id="pagination"
                    activeClassName={"item active "}
                    breakClassName={"item break-me "}
                    breakLabel={"..."}
                    containerClassName={"pagination"}
                    disabledClassName={"disabled-page"}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel={">"}
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(data.length / itemsPerPage)}
                    pageClassName={"item pagination-page "}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={"<"}
                    forcePage={currentPage}
                />}
            </div>
        </main>
    );
};


export default Category;