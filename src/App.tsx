import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Search from "./components/Search";
import Signup from "./pages/Signup";
import WatchList from "./components/WatchList";

const App = () => {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/form" element={<Signup />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
};

export default App;
