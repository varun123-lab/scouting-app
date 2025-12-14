import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import ScoutingView from './components/ScoutingView';
import AveragesView from './components/AveragesView';
import './App.css';

const AppContent: React.FC = () => {
  const { currentUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scouting' | 'averages'>('dashboard');

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content container">
          <h1 className="app-title">FTC Scout</h1>
          <div className="header-actions">
            <span className="user-info">
              {currentUser.name} | {currentUser.currentTeam}
            </span>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <div className="container">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-tab ${activeTab === 'scouting' ? 'active' : ''}`}
              onClick={() => setActiveTab('scouting')}
            >
              New Entry
            </button>
            <button
              className={`nav-tab ${activeTab === 'averages' ? 'active' : ''}`}
              onClick={() => setActiveTab('averages')}
            >
              Analytics
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'scouting' && <ScoutingView />}
        {activeTab === 'averages' && <AveragesView />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
