import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;