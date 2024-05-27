import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"; // Import your CSS file
import AdminDashboard from "./pages/dashboards/AdminDashboard.jsx";
import { AppContextProvider } from "./context/ContextProvider.jsx";
import CourseDashboard from "./pages/dashboards/CourseDashboard.jsx";

function App() {
  return (
    <div className="dark">
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/course-dashboard/:id" element={<CourseDashboard/>} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
