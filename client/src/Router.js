import AuthContext from "./lib/AuthContext";
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./layout/Navbar";
import Main from "./components/Main";
import Upload from "./components/Post/Upload";
import UserProfile from "./components/User/UserProfile";
import Login from "./auth/Login";
import PostDetail from "./components/Post/PostDetail";
import Deleted from "./layout/Deleted";
import Uploaded from "./layout/Uploaded";
import Register from "./auth/Register";
import Category from "./components/Category/Category";
import CategoryList from "./components/Category/CategoryList";

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
                <Route exact path="/" element={<Main />} />
                {loggedIn === true && (
                    <>
                        <Route path="/deleted" element={<Deleted />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/uploaded" element={<Uploaded />} />
                        <Route
                            path="/categories/:tagName"
                            element={<Category />}
                        />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/categories" element={<CategoryList />} />
                        <Route path="/user/:id" element={<UserProfile />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
