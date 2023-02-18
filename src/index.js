import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Product from "./Product"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from './success';
import Failed from './failed';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="users/*" element={<App />}></Route>
    <Route path="product/*" element={<Product />}></Route>
    <Route path="/success" element={<Success />}></Route>
    <Route path="/failed" element={<Failed />}></Route>
  </Routes>
</BrowserRouter>
);


