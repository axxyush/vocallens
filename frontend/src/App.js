import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Upload from "./components/Upload";
import AudioSelect from "./components/AudioSelect";
import Result from "./components/Result";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router basename="/vocallens">
        <Navbar />

        <div id="top">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/audioselect" element={<AudioSelect />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </>
  );
}

export default App;
