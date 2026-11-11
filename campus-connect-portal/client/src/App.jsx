
import { useState, useEffect } from 'react';
import Home from './Home.jsx';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [authTab, setAuthTab] = useState('login');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;

      if (hash === '#login') {
        setPage('auth');
        setAuthTab('login');
      } else if (hash === '#register') {
        setPage('auth');
        setAuthTab('register');
      } else {
        setPage('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openLogin = () => {
    setAuthTab('login');
    setPage('auth');
    window.location.hash = 'login';
  };

  const openRegister = () => {
    setAuthTab('register');
    setPage('auth');
    window.location.hash = 'register';
  };

  const goHome = () => {
    setPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToStudent = () => {
    document.getElementById('student-portal-view')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {page === 'home' && (
        <>
          <Home
            onLogin={openLogin}
            onRegister={openRegister}
            onStudent={scrollToStudent}
          />

          <StudentPortal onBackToHome={goHome} />
        </>
      )}

      {page === 'auth' && (
        <>
          <div className="return-bar">
            <button onClick={goHome}>
              ← Return to Campus Connect
            </button>
            <span>School of Computer Science & Engineering</span>
          </div>

          <div className="auth-page">
            <AuthModule
              activeTab={authTab}
              setActiveTab={setAuthTab}
            />
          </div>
        </>
      )}
    </>
  );
}
