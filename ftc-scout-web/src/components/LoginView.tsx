import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './LoginView.css';

const LoginView: React.FC = () => {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && team.trim()) {
      login(name.trim(), team.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>FTC Scout</h1>
        <p className="text-secondary mb-3">
          Enter your name and team to start scouting
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="team">Team Number/Name</label>
            <input
              id="team"
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              placeholder="e.g., 12345 or Team Robotics"
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={!name.trim() || !team.trim()}
          >
            Start Scouting
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
