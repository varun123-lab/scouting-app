import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateTeamAverages, calculateUserAverages, getUniqueTeams, getUniqueUsers } from '../utils/scoring';
import './AveragesView.css';

const AveragesView: React.FC = () => {
  const { currentUser, entries, getAllEntries } = useApp();
  const [selectedTeam, setSelectedTeam] = useState(currentUser?.currentTeam || '');
  const [viewMode, setViewMode] = useState<'team' | 'user' | 'perteam'>('team');

  const allEntries = getAllEntries();
  const teams = getUniqueTeams(allEntries);
  const users = getUniqueUsers(allEntries);

  // Current user averages
  const currentUserAvg = currentUser
    ? calculateUserAverages(currentUser.name, entries)
    : null;

  // Selected team averages
  const teamAvg = selectedTeam
    ? calculateTeamAverages(selectedTeam, allEntries)
    : null;

  // All user averages
  const allUserAverages = users.map((userName) =>
    calculateUserAverages(userName, allEntries)
  );

  // Per-team averages
  const perTeamAverages = teams.map((teamName) =>
    calculateTeamAverages(teamName, allEntries)
  );

  const exportCSV = () => {
    let csv = 'Team,User,Timestamp,Auto Total,Auto Leave,Classification,Overflow,Artifacts,Cycle Time,Play Style,Top/Bot,Points\n';
    
    allEntries.forEach((entry) => {
      csv += `${entry.teamName},${entry.userName},${new Date(entry.timestamp).toISOString()},`;
      csv += `${entry.autonomousTotal},${entry.autonomousLeave},${entry.classification},${entry.overflow},`;
      csv += `${entry.artifactsScored},${entry.cycleTime},${entry.playStyle},${entry.topBot},${entry.calculatedPoints}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ftc-scout-data-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="averages-view">
      <div className="averages-header">
        <h1>Analytics & Averages</h1>
        <button onClick={exportCSV} className="btn-success">
          Export CSV
        </button>
      </div>

      <div className="nav-tabs">
        <button
          className={`nav-tab ${viewMode === 'team' ? 'active' : ''}`}
          onClick={() => setViewMode('team')}
        >
          Team Averages
        </button>
        <button
          className={`nav-tab ${viewMode === 'user' ? 'active' : ''}`}
          onClick={() => setViewMode('user')}
        >
          User Stats
        </button>
        <button
          className={`nav-tab ${viewMode === 'perteam' ? 'active' : ''}`}
          onClick={() => setViewMode('perteam')}
        >
          All Teams
        </button>
      </div>

      {viewMode === 'team' && (
        <div className="averages-content">
          <div className="card">
            <h2>Team Performance</h2>
            <div className="form-group">
              <label htmlFor="teamSelect">Select Team</label>
              <select
                id="teamSelect"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">Choose a team...</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {teamAvg && teamAvg.entryCount > 0 ? (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Entries</div>
                  <div className="stat-value">{teamAvg.entryCount}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Points</div>
                  <div className="stat-value">{teamAvg.avgPoints.toFixed(1)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Autonomous</div>
                  <div className="stat-value">{teamAvg.avgAutonomous.toFixed(1)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Artifacts</div>
                  <div className="stat-value">{teamAvg.avgArtifacts.toFixed(1)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Cycle Time</div>
                  <div className="stat-value">{teamAvg.avgCycleTime.toFixed(1)}s</div>
                </div>
              </div>
            ) : (
              <p className="text-secondary mt-2">Select a team to view averages</p>
            )}
          </div>
        </div>
      )}

      {viewMode === 'user' && (
        <div className="averages-content">
          {currentUserAvg && (
            <div className="card">
              <h2>Your Performance</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Entries</div>
                  <div className="stat-value">{currentUserAvg.entryCount}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Points</div>
                  <div className="stat-value">{currentUserAvg.avgPoints.toFixed(1)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Autonomous</div>
                  <div className="stat-value">{currentUserAvg.avgAutonomous.toFixed(1)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Artifacts</div>
                  <div className="stat-value">{currentUserAvg.avgArtifacts.toFixed(1)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Cycle Time</div>
                  <div className="stat-value">{currentUserAvg.avgCycleTime.toFixed(1)}s</div>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <h2>All Users</h2>
            <div className="users-table">
              <div className="table-header">
                <span>User</span>
                <span>Entries</span>
                <span>Avg Points</span>
                <span>Avg Auto</span>
                <span>Avg Artifacts</span>
              </div>
              {allUserAverages.map((userAvg) => (
                <div key={userAvg.userName} className="table-row">
                  <span className="user-name">
                    {userAvg.userName}
                    {userAvg.userName === currentUser?.name && ' (You)'}
                  </span>
                  <span>{userAvg.entryCount}</span>
                  <span>{userAvg.avgPoints.toFixed(1)}</span>
                  <span>{userAvg.avgAutonomous.toFixed(1)}</span>
                  <span>{userAvg.avgArtifacts.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'perteam' && (
        <div className="averages-content">
          <div className="card">
            <h2>All Teams Comparison</h2>
            <div className="teams-table">
              <div className="table-header">
                <span>Team</span>
                <span>Entries</span>
                <span>Avg Points</span>
                <span>Avg Auto</span>
                <span>Avg Artifacts</span>
                <span>Avg Cycle</span>
              </div>
              {perTeamAverages.map((teamAvg) => (
                <div key={teamAvg.teamName} className="table-row">
                  <span className="team-name">{teamAvg.teamName}</span>
                  <span>{teamAvg.entryCount}</span>
                  <span>{teamAvg.avgPoints.toFixed(1)}</span>
                  <span>{teamAvg.avgAutonomous.toFixed(1)}</span>
                  <span>{teamAvg.avgArtifacts.toFixed(1)}</span>
                  <span>{teamAvg.avgCycleTime.toFixed(1)}s</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AveragesView;
