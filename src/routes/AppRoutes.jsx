import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
