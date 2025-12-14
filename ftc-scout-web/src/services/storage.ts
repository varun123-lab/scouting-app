// LocalStorage service for persisting data per user

import { ScoutingEntry, User } from '../types';

const CURRENT_USER_KEY = 'ftc_scout_current_user';
const ENTRIES_PREFIX = 'ftc_scout_entries_';

export const storageService = {
  // User management
  getCurrentUser(): User | null {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  clearCurrentUser(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Scouting entries (per user)
  getEntries(userName: string): ScoutingEntry[] {
    const key = ENTRIES_PREFIX + userName;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  saveEntries(userName: string, entries: ScoutingEntry[]): void {
    const key = ENTRIES_PREFIX + userName;
    localStorage.setItem(key, JSON.stringify(entries));
  },

  addEntry(userName: string, entry: ScoutingEntry): void {
    const entries = this.getEntries(userName);
    entries.push(entry);
    this.saveEntries(userName, entries);
  },

  updateEntry(userName: string, updatedEntry: ScoutingEntry): void {
    const entries = this.getEntries(userName);
    const index = entries.findIndex(e => e.id === updatedEntry.id);
    if (index !== -1) {
      entries[index] = updatedEntry;
      this.saveEntries(userName, entries);
    }
  },

  deleteEntry(userName: string, entryId: string): void {
    const entries = this.getEntries(userName);
    const filtered = entries.filter(e => e.id !== entryId);
    this.saveEntries(userName, filtered);
  },

  // Get all entries across all users (for per-team averages)
  getAllEntries(): ScoutingEntry[] {
    const allEntries: ScoutingEntry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(ENTRIES_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          const entries = JSON.parse(data);
          allEntries.push(...entries);
        }
      }
    }
    return allEntries;
  },
};
