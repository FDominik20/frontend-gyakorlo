import React from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HalakListPage } from './HalakListPage';
import { HalakSinglePage } from './HalakSinglePage';
import { HalakEditPage } from './HalakEditPage';

const HalakApp = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Halak listája</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/new-hal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Új hal</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HalakListPage />} />
          <Route path="/hal/:halId" element={<HalakSinglePage />} />
          <Route path="/edit-hal/:halId" element={<HalakEditPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default HalakApp;
