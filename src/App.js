import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import EditorPage from './editor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Home/Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for the Editor Page */}
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;