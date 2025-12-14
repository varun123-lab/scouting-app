// Core data types for FTC Scout Web App

export interface User {
  name: string;
  currentTeam: string;
}

export interface ScoutingEntry {
  id: string;
  teamName: string;
  userName: string;
  timestamp: number;
  
  // Autonomous
  autonomousTotal: number;
  autonomousLeave: boolean;
  classification: string;
  overflow: string;
  autoPathImage?: string; // base64 encoded image
  
  // Tele-op
  artifactsScored: number;
  cycleTime: number;
  playStyle: string;
  topBot: string;
  
  // Calculated
  calculatedPoints: number;
}

export interface TeamAverages {
  teamName: string;
  avgAutonomous: number;
  avgArtifacts: number;
  avgCycleTime: number;
  avgPoints: number;
  entryCount: number;
}

export interface UserAverages {
  userName: string;
  avgAutonomous: number;
  avgArtifacts: number;
  avgCycleTime: number;
  avgPoints: number;
  entryCount: number;
}
