import logo from "./logo.svg";
import "./Header.css";
import "./default.css";
import "./Pagination.css";
import Header from "./Header";
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./Upload";
import Categories from "./Catgories";
import Login from "./Login";
import PostDetail from "./PostDetail";
import Deleted from "./Deleted";
import Uploaded from "./Uploaded";
import Register from "./Register";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="/post/get/:id" element={<PostDetail />} />
          <Route path="/uploaded" element={<Uploaded />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
