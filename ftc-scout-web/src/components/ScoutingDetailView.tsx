import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScoutingEntry } from '../types';
import { calculatePoints } from '../utils/scoring';
import './ScoutingDetailView.css';

interface ScoutingDetailViewProps {
  entry: ScoutingEntry;
  onClose: () => void;
}

const ScoutingDetailView: React.FC<ScoutingDetailViewProps> = ({ entry, onClose }) => {
  const { updateEntry, deleteEntry, currentUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState<ScoutingEntry>({ ...entry });

  const canEdit = currentUser?.name === entry.userName;

  const handleSave = () => {
    const updatedEntry = {
      ...editedEntry,
      calculatedPoints: calculatePoints(editedEntry),
    };
    updateEntry(updatedEntry);
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(entry.id);
      onClose();
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <h2>{isEditing ? 'Edit' : ''} Entry Details</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        {!isEditing ? (
          // View Mode
          <div className="detail-content">
            <div className="detail-section">
              <h3>Team Information</h3>
              <div className="detail-row">
                <span className="detail-label">Team:</span>
                <span className="detail-value">{entry.teamName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Scouted by:</span>
                <span className="detail-value">{entry.userName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(entry.timestamp)}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Autonomous</h3>
              <div className="detail-row">
                <span className="detail-label">Total Points:</span>
                <span className="detail-value">{entry.autonomousTotal}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Left Starting Zone:</span>
                <span className="detail-value">{entry.autonomousLeave ? 'Yes' : 'No'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Classification:</span>
                <span className="detail-value">{entry.classification || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Overflow:</span>
                <span className="detail-value">{entry.overflow || 'N/A'}</span>
              </div>
              {entry.autoPathImage && (
                <div className="detail-image">
                  <span className="detail-label">Auto Path:</span>
                  <img src={entry.autoPathImage} alt="Autonomous path" />
                </div>
              )}
            </div>

            <div className="detail-section">
              <h3>Tele-op</h3>
              <div className="detail-row">
                <span className="detail-label">Artifacts Scored:</span>
                <span className="detail-value">{entry.artifactsScored}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cycle Time:</span>
                <span className="detail-value">{entry.cycleTime}s</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Play Style:</span>
                <span className="detail-value">{entry.playStyle || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Top/Bottom:</span>
                <span className="detail-value">{entry.topBot || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-section highlight">
              <h3>Calculated Points</h3>
              <div className="points-calc">
                <div>Artifacts: {entry.artifactsScored} × 3 = {entry.artifactsScored * 3}</div>
                <div>Autonomous: {entry.autonomousTotal}</div>
                <div className="total-points">Total: {entry.calculatedPoints} points</div>
              </div>
            </div>

            {canEdit && (
              <div className="detail-actions">
                <button onClick={() => setIsEditing(true)} className="btn-primary">
                  Edit Entry
                </button>
                <button onClick={handleDelete} className="btn-danger">
                  Delete
                </button>
              </div>
            )}
          </div>
        ) : (
          // Edit Mode
          <div className="detail-content">
            <div className="form-group">
              <label>Autonomous Total</label>
              <input
                type="number"
                value={editedEntry.autonomousTotal}
                onChange={(e) => setEditedEntry({ ...editedEntry, autonomousTotal: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Artifacts Scored</label>
              <input
                type="number"
                value={editedEntry.artifactsScored}
                onChange={(e) => setEditedEntry({ ...editedEntry, artifactsScored: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Cycle Time</label>
              <input
                type="number"
                value={editedEntry.cycleTime}
                onChange={(e) => setEditedEntry({ ...editedEntry, cycleTime: Number(e.target.value) })}
              />
            </div>
            <div className="detail-actions">
              <button onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-success">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoutingDetailView;
