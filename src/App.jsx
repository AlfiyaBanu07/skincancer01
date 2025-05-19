import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import './App.css';

function Detection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResult(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);
    setLoading(true);
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="upload-box">
      <h2>Skin Cancer Detection</h2>
      <p>Upload a skin image to get an AI-powered diagnosis.</p>

      <label htmlFor="image-upload" className="dropzone">
        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <span>📁 Click or drag to upload image</span>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

      <button onClick={handleSubmit} disabled={!image || loading}>
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>

      {result && (
        <div className="result">
          <h3>Diagnosis Result</h3>
          <p><strong>Prediction:</strong> {result.prediction}</p>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${Math.round(result.confidence * 100)}%` }}
            ></div>
          </div>
          <p><strong>Confidence:</strong> {Math.round(result.confidence * 100)}%</p>
        </div>
      )}
    </section>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h2>Early Detection Saves Lives</h2>
        <p>
          Upload an image and let our AI model provide a quick and reliable assessment.
        </p>
      </div>
      <img src="skin.png" alt="Skin check" className="hero-image" />
    </section>
  );
}

function HowToUse() {
  return (
    
    <section id="how-to-use" className="how-to-use">
      <h3>How to Use</h3>
      <p>Follow these steps:</p>
      <ol>
        <li>Select a high-quality skin lesion image.</li>
        <li>Click "Analyze Image" to get your prediction.</li>
        <li>Review the result and confidence level.</li>
      </ol>
      <a href="/DermAI_How_To_Use_Guide.pdf" target="_blank" rel="noopener noreferrer" style={{ marginTop: '1rem', display: 'inline-block' }}>
  📄 View How to Use Guide
</a>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="main-layout">
        {/* Navbar */}
        <header className="navbar">
          <h1>DermAI</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/detect">Detection</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <HowToUse />
                </>
              }
            />
            <Route path="/detect" element={<Detection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          © 2025 DermAI – Accurate Skin Cancer Detection. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
