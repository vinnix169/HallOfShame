import logo from "./logo.svg";
import "./Header.css";

import "./Pagination.css";
import Header from "./Header";
import Main from "./Main";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import Upload from "./Upload";
import Categories from "./Catgories";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
