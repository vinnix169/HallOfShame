
import "./styles/Header.css";
import "./styles/default.css";
import "./styles/Pagination.css";
import "./styles/Forms.css";
import "./styles/Main.css";
import "./styles/Categories.css";
import "./styles/Detail.css";
import Router from "./Router";
import { AuthContextProvider } from "./lib/AuthContex"
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
