import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";
import { TvShow } from "./pages/tvshow";
import { Rated } from "./pages/rated";

function App() {
  return (
    <div style={{ backgroundColor: '#052626' }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/rated" element={<Rated />}></Route>
          <Route path="/movie/:id" element={<Movie />}></Route>
          <Route path="/tvshow/:id" element={<TvShow />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
