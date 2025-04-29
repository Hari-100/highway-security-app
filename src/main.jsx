import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
// import './index.css'; // Assuming you are using TailwindCSS or basic CSS
// src/main.js
import './index.css'; // Or wherever your Tailwind CSS file is located
import { ClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = "pk_test_cXVpY2stZm9hbC0zMC5jbGVyay5hY2NvdW50cy5kZXYk";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
