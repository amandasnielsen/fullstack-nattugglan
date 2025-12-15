import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter'; 
import ForrestBackground from './assets/BG-forrest.jpg';
import { useGlobalOrderStatusPolling } from '@nattugglan/core';
import './index.css';

function App() {

  useGlobalOrderStatusPolling();
  
  return (
    <BrowserRouter>
      <div className="app">
        
        <img className="forrest" src={ForrestBackground} alt="Skogsbakgrund" />
        <AppRouter /> 
        
      </div>
    </BrowserRouter>
  );
}

export default App;