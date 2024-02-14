import AuthContext from "./lib/AuthContex";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Navbar";
import Main from "./components/Main";
import Upload from "./posts/Upload";
import Categories from "./layout/Categories";
import Login from "./auth/Login";
import PostDetail from "./posts/PostDetail";
import Deleted from "./layout/Deleted";
import Uploaded from "./layout/Uploaded";
import Register from "./auth/Register";
import Tag from "./Tag";

function Router() {
    const { loggedIn } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {loggedIn === false && (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}

                {loggedIn === true && (
                    <>
                        <Route path="/deleted" element={<Deleted />} />
                        <Route path="/post/get/:id" element={<PostDetail />} />
                        <Route path="/uploaded" element={<Uploaded />} />
                        <Route path="/tags/:tagName" element={<Tag />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/categories" element={<Categories />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
