import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AppRoutes } from './routes';

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <Router>
          <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main id="main-content" role="main" className="grow" tabIndex={-1}>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
