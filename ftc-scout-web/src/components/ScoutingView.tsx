import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScoutingEntry } from '../types';
import { calculatePoints } from '../utils/scoring';
import AutoPathCanvas from './AutoPathCanvas';
import './ScoutingView.css';

const ScoutingView: React.FC = () => {
  const { currentUser, addEntry } = useApp();
  const [teamName, setTeamName] = useState('');
  const [autonomousTotal, setAutonomousTotal] = useState(0);
  const [autonomousLeave, setAutonomousLeave] = useState(false);
  const [classification, setClassification] = useState('');
  const [overflow, setOverflow] = useState('');
  const [autoPathImage, setAutoPathImage] = useState<string>('');
  const [artifactsScored, setArtifactsScored] = useState(0);
  const [cycleTime, setCycleTime] = useState(0);
  const [playStyle, setPlayStyle] = useState('');
  const [topBot, setTopBot] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    const entry: ScoutingEntry = {
      id: Date.now().toString(),
      teamName,
      userName: currentUser.name,
      timestamp: Date.now(),
      autonomousTotal,
      autonomousLeave,
      classification,
      overflow,
      autoPathImage,
      artifactsScored,
      cycleTime,
      playStyle,
      topBot,
      calculatedPoints: calculatePoints({
        autonomousTotal,
        artifactsScored,
      }),
    };

    addEntry(entry);
    resetForm();
    alert('Scouting entry saved!');
  };

  const resetForm = () => {
    setTeamName('');
    setAutonomousTotal(0);
    setAutonomousLeave(false);
    setClassification('');
    setOverflow('');
    setAutoPathImage('');
    setArtifactsScored(0);
    setCycleTime(0);
    setPlayStyle('');
    setTopBot('');
    setShowCanvas(false);
  };

  const handleAutoPathSave = (imageData: string) => {
    setAutoPathImage(imageData);
    setShowCanvas(false);
    alert('Auto path saved!');
  };

  const previewPoints = calculatePoints({ autonomousTotal, artifactsScored });

  return (
    <div className="scouting-view">
      <h1>New Scouting Entry</h1>
      <p className="text-secondary mb-3">
        Recording as: <strong>{currentUser?.name}</strong> | Team: <strong>{currentUser?.currentTeam}</strong>
      </p>

      <form onSubmit={handleSubmit} className="scouting-form">
        <div className="card">
          <h2>Team Information</h2>
          <div className="form-group">
            <label htmlFor="teamName">Team Name/Number</label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g., 12345"
              required
            />
          </div>
        </div>

        <div className="card">
          <h2>Autonomous</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="autoTotal">Autonomous Total Points</label>
              <input
                id="autoTotal"
                type="number"
                value={autonomousTotal}
                onChange={(e) => setAutonomousTotal(Number(e.target.value))}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="classification">Classification</label>
              <input
                id="classification"
                type="text"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                placeholder="e.g., Level 1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="overflow">Overflow</label>
              <input
                id="overflow"
                type="text"
                value={overflow}
                onChange={(e) => setOverflow(e.target.value)}
                placeholder="Notes"
              />
            </div>
            <div className="form-group toggle-container">
              <input
                id="autoLeave"
                type="checkbox"
                checked={autonomousLeave}
                onChange={(e) => setAutonomousLeave(e.target.checked)}
              />
              <label htmlFor="autoLeave">Left Starting Zone</label>
            </div>
          </div>

          <div className="form-group">
            <button
              type="button"
              onClick={() => setShowCanvas(!showCanvas)}
              className="btn-secondary"
            >
              {showCanvas ? 'Hide' : 'Draw'} Auto Path
            </button>
            {autoPathImage && !showCanvas && (
              <div className="auto-path-preview mt-2">
                <img src={autoPathImage} alt="Auto path" />
              </div>
            )}
          </div>

          {showCanvas && (
            <AutoPathCanvas
              onSave={handleAutoPathSave}
              initialImage={autoPathImage}
            />
          )}
        </div>

        <div className="card">
          <h2>Tele-op</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="artifacts">Artifacts Scored</label>
              <input
                id="artifacts"
                type="number"
                value={artifactsScored}
                onChange={(e) => setArtifactsScored(Number(e.target.value))}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cycleTime">Cycle Time (seconds)</label>
              <input
                id="cycleTime"
                type="number"
                value={cycleTime}
                onChange={(e) => setCycleTime(Number(e.target.value))}
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="playStyle">Play Style</label>
              <select
                id="playStyle"
                value={playStyle}
                onChange={(e) => setPlayStyle(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Offensive">Offensive</option>
                <option value="Defensive">Defensive</option>
                <option value="Balanced">Balanced</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="topBot">Top/Bottom Focus</label>
              <select
                id="topBot"
                value={topBot}
                onChange={(e) => setTopBot(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card card-elevated">
          <h2>Calculated Points</h2>
          <div className="points-preview">
            <div className="points-breakdown">
              <span>Artifacts: {artifactsScored} × 3 = {artifactsScored * 3}</span>
              <span>Autonomous: {autonomousTotal}</span>
            </div>
            <div className="points-total">
              Total: <strong>{previewPoints} points</strong>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={resetForm} className="btn-secondary">
            Clear Form
          </button>
          <button type="submit" className="btn-primary" disabled={!teamName}>
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScoutingView;
