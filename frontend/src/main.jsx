/* ============================================
   main.jsx — App entry point.
   Mounts React with Bootstrap + global styles.
   ============================================ */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap CSS + Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom global styles
import './styles/global.css';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
