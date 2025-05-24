import { react, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation ,Navigate} from 'react-router-dom';  // o BrowserRouter
import HomePage from './pages/HomePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import RoomPage from './pages/RoomPage';
import LoginPage from './pages/LoginPage.jsx';
import AlquilerYPage from './pages/AlquilerYPage.jsx';
import MisReservasPage from './pages/MisReservasPage.jsx';
import CheckInPage from './pages/CheckInPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RoomsProvider } from './context/RoomsContext';
import { ReservationsProvider } from './context/ReservationsContext';
import AdminPage from './pages/AdminPage.jsx';

// Componente para rutas protegidas según rol
function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // No autenticado: al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (adminOnly && !user.tipo) {
    // Autenticado pero no admin: a home
    return <Navigate to="/" replace />;
  }
  return children;
}
// Componente para desplazamiento suave a un hash

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
    <AuthProvider>
      <RoomsProvider>
        <ReservationsProvider>
          <HashRouter>
            <ScrollToHash />
            <Routes>
              {/* públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/room" element={<RoomPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistrationPage />} />

              {/* protegidas */}
              <Route
                path="/alquiler"
                element={
                  <ProtectedRoute>
                    <AlquilerYPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservas"
                element={
                  <ProtectedRoute>
                    <MisReservasPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkin"
                element={
                  <ProtectedRoute>
                    <CheckInPage />
                  </ProtectedRoute>
                }
              />

              {/* admin */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />

              {/* fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </ReservationsProvider>
      </RoomsProvider>
    </AuthProvider>
  );
}
