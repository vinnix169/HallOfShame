import Router from "./Router";
import { AuthContextProvider } from "./lib/AuthContext";
import axios from "axios";

import "./styles/Default.scss";
import "./styles/Navbar.scss";
import "./styles/Pagination.scss";
import "./styles/PostList.scss";
import "./styles/Form.scss";
import "./styles/Post.scss";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
