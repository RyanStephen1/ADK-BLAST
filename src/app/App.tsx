import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AppRoutes } from './routes';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen font-sans flex flex-col">
          <Navbar />
          <main id="main-content" role="main" className="grow" tabIndex={-1}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
