// App-wide state context

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ScoutingEntry } from '../types';
import { storageService } from '../services/storage';

interface AppState {
  currentUser: User | null;
  entries: ScoutingEntry[];
  login: (name: string, team: string) => void;
  logout: () => void;
  addEntry: (entry: ScoutingEntry) => void;
  updateEntry: (entry: ScoutingEntry) => void;
  deleteEntry: (entryId: string) => void;
  getAllEntries: () => ScoutingEntry[];
  refreshEntries: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<ScoutingEntry[]>([]);

  // Load current user on mount
  useEffect(() => {
    const user = storageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setEntries(storageService.getEntries(user.name));
    }
  }, []);

  const login = (name: string, team: string) => {
    const user: User = { name, currentTeam: team };
    storageService.setCurrentUser(user);
    setCurrentUser(user);
    setEntries(storageService.getEntries(name));
  };

  const logout = () => {
    storageService.clearCurrentUser();
    setCurrentUser(null);
    setEntries([]);
  };

  const addEntry = (entry: ScoutingEntry) => {
    if (!currentUser) return;
    storageService.addEntry(currentUser.name, entry);
    setEntries(storageService.getEntries(currentUser.name));
  };

  const updateEntry = (entry: ScoutingEntry) => {
    if (!currentUser) return;
    storageService.updateEntry(currentUser.name, entry);
    setEntries(storageService.getEntries(currentUser.name));
  };

  const deleteEntry = (entryId: string) => {
    if (!currentUser) return;
    storageService.deleteEntry(currentUser.name, entryId);
    setEntries(storageService.getEntries(currentUser.name));
  };

  const getAllEntries = () => {
    return storageService.getAllEntries();
  };

  const refreshEntries = () => {
    if (currentUser) {
      setEntries(storageService.getEntries(currentUser.name));
    }
  };

  const value: AppState = {
    currentUser,
    entries,
    login,
    logout,
    addEntry,
    updateEntry,
    deleteEntry,
    getAllEntries,
    refreshEntries,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
