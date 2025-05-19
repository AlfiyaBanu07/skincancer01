import React from 'react';

function About() {
  return (
    <div className="upload-box">
      <h2>About DermAI</h2>
      <p>
        <strong>DermAI</strong> is a skin cancer detection system powered by state-of-the-art AI technology. Our goal is to assist dermatologists and individuals in identifying potential skin cancers early, especially melanoma, basal cell carcinoma, and other critical conditions.
      </p>
      <p>
        Built using deep learning models trained on thousands of dermatology images, DermAI aims to provide fast, accessible, and accurate image-based predictions.
      </p>
      <p>
        While this tool can assist in early detection, it is not a replacement for professional medical advice. Always consult with a qualified healthcare provider for a confirmed diagnosis.
      </p>
      <p>
        <strong>Technologies Used:</strong> RegNet, TensorFlow, Flask, React, Hugging Face Spaces.
      </p>
    </div>
  );
}

export default About;
