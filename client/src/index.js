import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/user';
import { ToysProvider } from './context/toys';
import { CartProvider } from './context/cart'
import { PreviousOrdersProvider } from './context/previousOrders';
import { ToyToUpdateProvider } from './context/toyToUpdate';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PreviousOrdersProvider>
      <CartProvider>
        <UserProvider>
          <ToysProvider>
            <ToyToUpdateProvider>
              <App />
            </ToyToUpdateProvider>
          </ToysProvider>
        </UserProvider>
      </CartProvider>
    </PreviousOrdersProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
