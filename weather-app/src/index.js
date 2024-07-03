import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Card from './Card';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div className="bg-blue-950 w-full min-h-lvh flex items-center justify-center">
      <Card/>
    </div>
  </React.StrictMode>
);

