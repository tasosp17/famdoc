import './App.css';
import Logo from './Logo';
import React, { useState } from 'react';
import Login from './Login';
import DoctorSearch from './DoctorSearch';
import Dashboard from './Dashboard';
import DoctorProfile from './DoctorProfile';
import UserProfile from './UserProfile';
import AppointmentsHub from './AppointmentsHub';
import BookAppointment from './BookAppointment';
import Register from './Register';

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [view, setView] = useState('search');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleLogin = (id, role, jwtToken) => {
    setCurrentUserId(id);
    setUserRole(role);
    setToken(jwtToken);
    //set default view based on role
    setView(role === 'doctor' ? 'doctor-appointments' : 'search');
  };

  const handleLogout = () => {
    setCurrentUserId(null);
    setUserRole(null);
    setToken(null);
    setAuthView('login');
  };
  
  const handleSelectDoctor = (id) => {
    setSelectedDoctorId(id);
    setView('doctor-profile');
  };

  const handleRequestAppointment = (id) => {
    setSelectedDoctorId(id);
    setView('book-appointment');
  };

  //if not logged in, show only the login screen
  if(!currentUserId) {
    if (authView === 'register'){
      return <Register onNavigateToLogin={() => setAuthView('login')} />
    }
    return <Login onLogin={handleLogin} onNavigateToRegister={() => setAuthView('register')} />
  }
  
  return (
    <div className="App">
      <nav className="navbar">
        <Logo />
        
        {/* USER NAVIGATION */}
        {userRole === 'user' && (
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => setView('search')}>Search</button>
          <button className="nav-btn" onClick={() => setView('dashboard')}>Dashboard</button>
          <button className="nav-btn" onClick={() => setView('appointments')}>Appointments</button>
          <button className="nav-btn" onClick={() => setView('user-profile')}>Profile</button>
          <button className="nav-btn" style={{ color: 'red' }} onClick={handleLogout}>Sign Out</button>
        </div>
        )}

        {/* DOCTOR NAVIGATION */}
        {userRole === 'doctor' && (
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => setView('doctor-appointments')}>Appointments</button>
          <button className="nav-btn" onClick={() => setView('doctor-profile')}>Profile</button>
          <button className="nav-btn" style={{ color: 'red' }} onClick={handleLogout}>Sign Out</button>
        </div>
        )}
      </nav>

      {/* Content Area */}
      <div className="content-area">
          {/* USER VIEWS */}
          {userRole === 'user' && view === 'search' && <DoctorSearch token={token} onSelectDoctor={handleSelectDoctor} />}
          {userRole === 'user' && view === 'dashboard' && <Dashboard token={token} id={currentUserId} onSelectDoctor={handleSelectDoctor} />}
          {userRole === 'user' && view === 'doctor-profile' && <DoctorProfile token={token} doctorId={selectedDoctorId} role={userRole} onBack={() => setView('search')} onRequestAppointment={handleRequestAppointment} />}
          {userRole === 'user' && view === 'book-appointment' && <BookAppointment token={token} doctorId={selectedDoctorId} userId={currentUserId} onBack={() => setView('doctor-profile')} onSuccess={() => setView('appointments')} />} 
          {userRole === 'user' && view === 'user-profile' && <UserProfile token={token} id={currentUserId} />}
          {userRole === 'user' && view === 'appointments' && <AppointmentsHub token={token} id={currentUserId} role={userRole} /> } 

          {/* DOCTOR VIEWS */}
          {userRole === 'doctor' && view === 'doctor-appointments' && <AppointmentsHub token={token} id={currentUserId} role={userRole} />}
          {userRole === 'doctor' && view === 'doctor-profile' && <DoctorProfile token={token} doctorId={currentUserId} onBack={() => setView('doctor-appointments')} />}
      </div>
    </div>
  );
}

export default App;
