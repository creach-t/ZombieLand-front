/* eslint-disable react/react-in-jsx-scope */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.tsx';
import './styles/output.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
