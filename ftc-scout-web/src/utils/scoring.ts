// Utility functions for scoring calculations

import { ScoutingEntry, TeamAverages, UserAverages } from '../types';

/**
 * Calculate total points for a scouting entry
 * Formula: (artifacts * 3) + autonomous total
 */
export function calculatePoints(entry: Partial<ScoutingEntry>): number {
  const artifactsPoints = (entry.artifactsScored || 0) * 3;
  const autoPoints = entry.autonomousTotal || 0;
  return artifactsPoints + autoPoints;
}

/**
 * Calculate averages for a specific team
 */
export function calculateTeamAverages(
  teamName: string,
  entries: ScoutingEntry[]
): TeamAverages {
  const teamEntries = entries.filter(e => e.teamName === teamName);
  
  if (teamEntries.length === 0) {
    return {
      teamName,
      avgAutonomous: 0,
      avgArtifacts: 0,
      avgCycleTime: 0,
      avgPoints: 0,
      entryCount: 0,
    };
  }

  const sum = teamEntries.reduce(
    (acc, entry) => ({
      autonomous: acc.autonomous + entry.autonomousTotal,
      artifacts: acc.artifacts + entry.artifactsScored,
      cycleTime: acc.cycleTime + entry.cycleTime,
      points: acc.points + entry.calculatedPoints,
    }),
    { autonomous: 0, artifacts: 0, cycleTime: 0, points: 0 }
  );

  const count = teamEntries.length;

  return {
    teamName,
    avgAutonomous: sum.autonomous / count,
    avgArtifacts: sum.artifacts / count,
    avgCycleTime: sum.cycleTime / count,
    avgPoints: sum.points / count,
    entryCount: count,
  };
}

/**
 * Calculate averages for a specific user
 */
export function calculateUserAverages(
  userName: string,
  entries: ScoutingEntry[]
): UserAverages {
  const userEntries = entries.filter(e => e.userName === userName);
  
  if (userEntries.length === 0) {
    return {
      userName,
      avgAutonomous: 0,
      avgArtifacts: 0,
      avgCycleTime: 0,
      avgPoints: 0,
      entryCount: 0,
    };
  }

  const sum = userEntries.reduce(
    (acc, entry) => ({
      autonomous: acc.autonomous + entry.autonomousTotal,
      artifacts: acc.artifacts + entry.artifactsScored,
      cycleTime: acc.cycleTime + entry.cycleTime,
      points: acc.points + entry.calculatedPoints,
    }),
    { autonomous: 0, artifacts: 0, cycleTime: 0, points: 0 }
  );

  const count = userEntries.length;

  return {
    userName,
    avgAutonomous: sum.autonomous / count,
    avgArtifacts: sum.artifacts / count,
    avgCycleTime: sum.cycleTime / count,
    avgPoints: sum.points / count,
    entryCount: count,
  };
}

/**
 * Get all unique team names from entries
 */
export function getUniqueTeams(entries: ScoutingEntry[]): string[] {
  const teams = new Set(entries.map(e => e.teamName));
  return Array.from(teams).sort();
}

/**
 * Get all unique user names from entries
 */
export function getUniqueUsers(entries: ScoutingEntry[]): string[] {
  const users = new Set(entries.map(e => e.userName));
  return Array.from(users).sort();
}
