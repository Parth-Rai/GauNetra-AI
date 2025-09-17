import React, { useState } from 'react';
import { predictImage } from '../api';
import { FiUploadCloud, FiXCircle } from 'react-icons/fi';


const ConfidenceMeter = ({ value }) => {
  const percentage = (value * 100).toFixed(1);
  return (
    <div className="confidence-meter">
      <div className="confidence-label">
        <span>Confidence</span>
        <span>{percentage}%</span>
      </div>
      <div className="confidence-bar-bg">
        <div className="confidence-bar-fg" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

function LiveDemo() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  
  const [resultPreview, setResultPreview] = useState(null);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    setResultPreview(preview);

    try {
      const data = await predictImage(file);
      setResult(data);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError("Prediction failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="section">
      <div className="content-card">
        <h2>Live Demo</h2>
        <p>Upload an image to see the AI in action. Drag & drop or click below.</p>
        <div className="livedemo-wrapper">
          {/* Uploader Panel */}
          <div 
            className={`uploader-zone ${isDragging ? 'drag-over' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="uploader-idle">
                <FiUploadCloud className="uploader-icon" />
                <h3>Drag & Drop an Image</h3>
                <p>or</p>
                <input 
                  type="file" 
                  id="file-upload" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e.target.files[0])} 
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="uploader-button">
                  Browse Files
                </label>
              </div>
            ) : (
              <div className="uploader-preview">
                <img src={preview} alt="Selected" className="preview-image" />
                <p className="file-name">{file.name}</p>
                <button onClick={handleRemoveFile} className="remove-button">
                  <FiXCircle /> Remove
                </button>
              </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="result-panel">
            {loading && <p>Analyzing...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
              <div className="result-card">
                <img src={resultPreview} alt="Prediction" className="result-image" />
                <h3>Prediction Result</h3>
                <p className="breed-name">{result.breed}</p>
                <ConfidenceMeter value={result.confidence} />
              </div>
            )}
            {!result && !loading && !error && (
              <div className="placeholder-text">
                Your prediction result will appear here.
              </div>
            )}
          </div>
        </div>
        {file && !loading && (
          <button onClick={handleSubmit} className="predict-button">Predict Breed</button>
        )}
      </div>
    </div>
  );
}

export default LiveDemo;