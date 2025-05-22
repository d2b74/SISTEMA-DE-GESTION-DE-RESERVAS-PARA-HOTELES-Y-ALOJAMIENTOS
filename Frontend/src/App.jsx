import { react, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';  // o BrowserRouter
import HomePage from './pages/HomePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import RoomPage from './pages/RoomPage';
import LoginPage from './pages/LoginPage.jsx';
import AlquilerYPage from './pages/AlquilerYPage.jsx';
import  MisReservasPage from './pages/MisReservasPage.jsx';
import CheckInPage from './pages/CheckInPage.jsx';

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);
  return null;
}



export default function App() {
  return (
    <HashRouter>
      <ScrollToHash />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/alquiler" element={<AlquilerYPage />} />
        <Route path="/reservas" element={<MisReservasPage />} />
        <Route path="/checkin" element={<CheckInPage />} />
      </Routes>
    </HashRouter>
  );
}
