//import { app, BrowserWindow } from 'electron';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

window.addEventListener('load', () => {
	navigator.serviceWorker.register('/sw.js')
	.then(registration => console.log('Service worker registered: ', registration))
	.catch(registrationError => console.error('Service worker registration failed: ', registrationError));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
