import './App.css';
import 'antd/dist/antd.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import IndividualReports from './components/IndividualReports/IndividualReports';
import { useState } from "react";
import AuthService from './services/AuthService';


function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <>
      {currentUser && (
        <div className="nav-item">
          <a href="/login" className="nav-link" onClick={AuthService.logout}>
            LogOut
          </a>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm setUser={setCurrentUser} />} />
        <Route path="/individual-reports" element={<IndividualReports />} />
      </Routes>
    </>
  );
}

export default App;
