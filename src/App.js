import "./App.css";
// import AudioRecorder from "./components/AudioRecorder";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Upload from "./components/Upload";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <div id="top">
          <Routes>
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </>
  );
}

export default App;
