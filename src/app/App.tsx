import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main id="main-content" role="main" className="grow" tabIndex={-1}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
