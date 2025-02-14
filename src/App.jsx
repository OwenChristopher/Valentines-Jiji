// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartingPage from './components/StartingPage';
import Page1 from './components/Page1';
import MailTransition from './components/MailTransition';
import { MusicProvider } from './contexts/MusicContext';

function App() {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/mail-transition" element={<MailTransition />} />
        </Routes>
      </Router>
    </MusicProvider>
  );
}

export default App;
