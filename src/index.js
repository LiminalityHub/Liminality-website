import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PostsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PostsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
