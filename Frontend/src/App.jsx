import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';  // o BrowserRouter
import HomePage from './pages/HomePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import RoomPage from './pages/RoomPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
    </HashRouter>
  );
}
