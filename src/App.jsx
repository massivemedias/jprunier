import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import News from './pages/News';
import './styles/global.css';

function ServiceRedirect() {
  const { serviceId } = useParams();
  return <Navigate to={`/services#${serviceId}`} replace />;
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <SEO />
          <div className="app">
            <Header />
            <ScrollToTop />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:serviceId" element={<ServiceRedirect />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
