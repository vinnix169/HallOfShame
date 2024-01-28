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
          <Route path="/deleted" element={<Deleted />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
