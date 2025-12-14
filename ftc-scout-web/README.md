# FTC Scout Web App

A comprehensive web-based scouting application for FTC (FIRST Tech Challenge) competitions. This app allows teams to track match performance, calculate scores, and analyze team statistics with an elegant dark theme interface.

## Features

### MVP Features ✅
- **User Authentication**: Local storage-based login system with per-user data isolation
- **Scouting Form**: Comprehensive data entry for autonomous, tele-op, and endgame phases
- **Auto Path Drawing**: Interactive canvas for drawing and saving autonomous robot paths
- **Real-time Scoring**: Automatic calculation of points (Artifacts × 3 + Autonomous Total)
- **Dashboard**: View all scouting entries with grouping by user
- **Detail View**: Read-only and editable detail views for each entry
- **Analytics & Averages**: 
  - Single-team performance averages
  - Current user statistics
  - Per-team comparison across all users
  - All users leaderboard
- **Data Export**: CSV export functionality for all scouting data
- **Dark Theme**: Sleek black/dark theme optimized for on-device use
- **Mobile Responsive**: Touch-friendly interface for tablets and smartphones

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Pure CSS with CSS Variables
- **State Management**: React Context API
- **Storage**: Browser LocalStorage (per-user data isolation)
- **Drawing**: HTML5 Canvas API

## Project Structure

```
ftc-scout-web/
├── src/
│   ├── components/         # React components
│   │   ├── LoginView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── ScoutingView.tsx
│   │   ├── ScoutingDetailView.tsx
│   │   ├── AveragesView.tsx
│   │   └── AutoPathCanvas.tsx
│   ├── context/           # React Context for state management
│   │   └── AppContext.tsx
│   ├── services/          # Data services
│   │   └── storage.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── scoring.ts
│   ├── App.tsx            # Main app component
│   ├── App.css            # Global styles
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Navigate to the project directory**:
   ```bash
   cd ftc-scout-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit `http://localhost:5173` (or the URL shown in your terminal)

5. **Build for production**:
   ```bash
   npm run build
   ```
   The built files will be in the `dist/` folder.

## Usage Guide

### First Time Setup
1. Open the app and enter your name and team number/name
2. Click "Start Scouting" to begin

### Creating a Scouting Entry
1. Navigate to the "New Entry" tab
2. Fill in the team information
3. Enter autonomous data (points, classification, overflow)
4. Optionally draw the autonomous path on the field diagram
5. Enter tele-op data (artifacts scored, cycle time, play style)
6. Review the calculated points
7. Click "Save Entry"

### Viewing Entries
1. Go to the "Dashboard" tab
2. Switch between "My Entries" and "All Users"
3. Click any entry card to view full details
4. Edit or delete your own entries

### Analytics
1. Navigate to the "Analytics" tab
2. Choose from three views:
   - **Team Averages**: Select a specific team to see their performance metrics
   - **User Stats**: View your personal stats and compare with other scouts
   - **All Teams**: Compare all teams that have been scouted
3. Click "Export CSV" to download all data

### Drawing Auto Paths
1. In the scouting form, click "Draw Auto Path"
2. Use your mouse or touch to draw on the field diagram
3. Click "Clear" to erase and start over
4. Click "Save Path" to capture the drawing
5. The path will be saved with your scouting entry

## Data Storage

All data is stored locally in the browser's LocalStorage:
- **Per-user isolation**: Each scout's entries are stored separately
- **Persistent**: Data remains until you clear browser storage or logout
- **No server required**: Fully client-side application
- **Export capability**: Download CSV backups of your data

## Scoring System

The app uses a simplified scoring formula (extensible for season-specific rules):

```
Total Points = (Artifacts Scored × 3) + Autonomous Total Points
```

### Tracked Metrics
- **Autonomous**: Total points, left starting zone, classification, overflow, path drawing
- **Tele-op**: Artifacts scored, cycle time, play style, top/bottom focus
- **Calculated**: Automatic point calculation and aggregation

## Customization

### Field Image
To use a real FTC field image, replace the placeholder in `AutoPathCanvas.tsx`:
```typescript
// Replace the createFieldPlaceholder() call with:
fieldImage.src = '/path/to/your/field-image.png';
```

### Scoring Formula
Modify the calculation in `src/utils/scoring.ts`:
```typescript
export function calculatePoints(entry: Partial<ScoutingEntry>): number {
  // Customize your scoring logic here
}
```

### Theme Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --accent-blue: #007AFF;
  --accent-green: #34C759;
  /* Add your custom colors */
}
```

## Future Enhancements (Post-MVP)

- **Season-specific scoring**: Modular scoring system for different FTC seasons
- **Match context**: Match number, opponent, alliance position tracking
- **Team directory**: Integration with FTC API for team lookup
- **Cloud sync**: iCloud/Firebase integration for multi-device access
- **In-match UI**: Optimized interface with phase timers
- **Advanced analytics**: Charts, graphs, and trend analysis
- **Offline PWA**: Progressive Web App for offline functionality

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is an FTC scouting tool. Feel free to fork and customize for your team's needs!

## License

MIT License - Feel free to use and modify for your FTC team.

## Credits

Built for FTC teams to improve their scouting process and match strategy.

---

**Happy Scouting! 🤖**
