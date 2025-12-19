import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import ForrestBackground from './assets/BG-forrest.jpg';
import { useGlobalOrderStatusPolling } from '@nattugglan/core';
import { LoadingPage } from '@nattugglan/loadingpage';
import './index.css';

function App() {
  useGlobalOrderStatusPolling();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <img className="forrest" src={ForrestBackground} alt="Skogsbakgrund" />

        {isLoading ? <LoadingPage /> : <AppRouter />}
      </div>
    </BrowserRouter>
  );
}

export default App;
