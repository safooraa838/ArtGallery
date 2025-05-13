import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GalleryProvider } from './contexts/GalleryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { ArtworkDetailPage } from './pages/ArtworkDetailPage';
import { SubmitArtPage } from './pages/SubmitArtPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GalleryProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
                  <Route path="/submit" element={<SubmitArtPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </GalleryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;