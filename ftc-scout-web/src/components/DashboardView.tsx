import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScoutingEntry } from '../types';
import ScoutingDetailView from './ScoutingDetailView';
import './DashboardView.css';

const DashboardView: React.FC = () => {
  const { currentUser, entries, getAllEntries } = useApp();
  const [selectedEntry, setSelectedEntry] = useState<ScoutingEntry | null>(null);
  const [viewMode, setViewMode] = useState<'my' | 'all'>('my');

  const allEntries = viewMode === 'all' ? getAllEntries() : entries;
  const sortedEntries = [...allEntries].sort((a, b) => b.timestamp - a.timestamp);

  // Group entries by user
  const entriesByUser = sortedEntries.reduce((acc, entry) => {
    if (!acc[entry.userName]) {
      acc[entry.userName] = [];
    }
    acc[entry.userName].push(entry);
    return acc;
  }, {} as Record<string, ScoutingEntry[]>);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="dashboard-view">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="text-secondary">
          Welcome back, <strong>{currentUser?.name}</strong>
        </p>
      </div>

      <div className="view-toggle">
        <button
          className={`nav-tab ${viewMode === 'my' ? 'active' : ''}`}
          onClick={() => setViewMode('my')}
        >
          My Entries ({entries.length})
        </button>
        <button
          className={`nav-tab ${viewMode === 'all' ? 'active' : ''}`}
          onClick={() => setViewMode('all')}
        >
          All Users ({getAllEntries().length})
        </button>
      </div>

      {sortedEntries.length === 0 ? (
        <div className="empty-state card">
          <p className="text-secondary">No scouting entries yet. Start by creating a new entry!</p>
        </div>
      ) : (
        <div className="entries-container">
          {Object.entries(entriesByUser).map(([userName, userEntries]) => (
            <div key={userName} className="user-group">
              <h2 className="user-group-header">
                {userName} {userName === currentUser?.name && '(You)'}
                <span className="entry-count">{userEntries.length} entries</span>
              </h2>
              
              <div className="entries-grid">
                {userEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="entry-card card"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <div className="entry-header">
                      <h3>{entry.teamName}</h3>
                      <div className="entry-points">{entry.calculatedPoints} pts</div>
                    </div>
                    
                    <div className="entry-stats">
                      <div className="stat">
                        <span className="stat-label">Auto</span>
                        <span className="stat-value">{entry.autonomousTotal}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Artifacts</span>
                        <span className="stat-value">{entry.artifactsScored}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Cycle</span>
                        <span className="stat-value">{entry.cycleTime}s</span>
                      </div>
                    </div>
                    
                    {entry.autoPathImage && (
                      <div className="entry-path-indicator">
                        📍 Auto path recorded
                      </div>
                    )}
                    
                    <div className="entry-footer text-xs text-tertiary">
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEntry && (
        <ScoutingDetailView
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
};

export default DashboardView;
