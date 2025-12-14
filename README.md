# FTC Scouting App 🤖

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive web-based scouting application for **FIRST Tech Challenge (FTC)** competitions. Track match performance, calculate scores, and analyze team statistics with an elegant dark theme interface optimized for on-device use during competitions.

![FTC Scout Preview](https://via.placeholder.com/800x400/000000/007AFF?text=FTC+Scout+App)

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Local storage-based login with per-user data isolation
- **Scouting Forms** - Comprehensive data entry for autonomous, tele-op, and endgame phases
- **Auto Path Drawing** - Interactive HTML5 canvas for drawing and saving autonomous robot paths
- **Real-time Scoring** - Automatic calculation: `(Artifacts × 3) + Autonomous Total`
- **Dashboard** - View all entries with grouping by user and team
- **Detail Views** - Editable views for each scouting entry
- **Analytics** - Team averages, user stats, and per-team comparisons
- **Data Export** - CSV export for all scouting data
- **Dark Theme** - Sleek black theme optimized for competition environments
- **Mobile Responsive** - Touch-friendly interface for tablets and smartphones

### 📊 Tracked Metrics
- **Autonomous:** Points, leaving start zone, classification, overflow, path drawing
- **Tele-op:** Artifacts scored, cycle time, play style, top/bottom focus
- **Calculated:** Automatic point totals and team/user averages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/varun123-lab/scouting-app.git
cd scouting-app

# Navigate to web app
cd ftc-scout-web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

The optimized production files will be in the `dist/` folder.

## 📱 Usage

### 1️⃣ Login
- Enter your name and team number
- Click "Start Scouting"

### 2️⃣ Create Scouting Entry
- Go to **"New Entry"** tab
- Fill in team information
- Enter autonomous data
- Draw the auto path on the field canvas (optional)
- Enter tele-op metrics
- Review calculated points
- Save entry

### 3️⃣ View Dashboard
- See all scouting entries with calculated points
- Switch between "My Entries" and "All Users"
- Click any entry to view full details
- Edit or delete your own entries

### 4️⃣ Analyze Data
- Navigate to **"Analytics"** tab
- View team-specific averages
- Compare your stats with other scouts
- See all-teams comparison
- Export data as CSV

## 🏗️ Project Structure

```
ftc-scout-web/
├── src/
│   ├── components/          # React components
│   │   ├── LoginView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── ScoutingView.tsx
│   │   ├── ScoutingDetailView.tsx
│   │   ├── AveragesView.tsx
│   │   └── AutoPathCanvas.tsx
│   ├── context/            # State management
│   │   └── AppContext.tsx
│   ├── services/           # Data services
│   │   └── storage.ts
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   ├── utils/              # Helper functions
│   │   └── scoring.ts
│   ├── App.tsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 💻 Technology Stack

- **Frontend:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling:** Pure CSS with CSS Variables (Dark Theme)
- **State Management:** React Context API
- **Storage:** Browser LocalStorage
- **Drawing:** HTML5 Canvas API

## 🎨 Customization

### Change Field Image
Edit `src/components/AutoPathCanvas.tsx`:
```typescript
// Replace placeholder with your FTC field image
fieldImage.src = '/path/to/your-field-image.png';
```

### Modify Scoring Formula
Edit `src/utils/scoring.ts`:
```typescript
export function calculatePoints(entry: Partial<ScoutingEntry>): number {
  // Customize scoring logic
  return (entry.artifactsScored || 0) * 3 + (entry.autonomousTotal || 0);
}
```

### Update Theme
Edit CSS variables in `src/App.css`:
```css
:root {
  --accent-blue: #007AFF;
  --accent-green: #34C759;
  /* Customize colors */
}
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Run `npm run build`
2. Drag `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
1. Build: `npm run build`
2. Push `dist/` folder to `gh-pages` branch

## 📦 Data Storage

- **Local Storage** - All data stored in browser's LocalStorage
- **Per-User Isolation** - Each scout's entries stored separately
- **Persistent** - Data remains until browser storage cleared
- **Export** - CSV download for backup and analysis

## 🔮 Future Enhancements

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Progressive Web App (PWA) support
- [ ] Advanced analytics with charts
- [ ] Season-specific scoring modules
- [ ] Team API integration
- [ ] Match scheduling
- [ ] Real-time collaboration

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Customize for your team

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🎯 About

Built for FTC teams to streamline scouting and improve match strategy. This web app provides all the essential tools needed during competitions with an interface optimized for quick data entry and analysis.

## 🙏 Acknowledgments

- Built for the FTC community
- Inspired by competitive robotics scouting needs
- Designed for ease of use during high-pressure competitions

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/varun123-lab/scouting-app/issues)
- **Documentation:** Check `ftc-scout-web/README.md` for detailed docs

---

**Made with ❤️ for FTC Teams | Happy Scouting! 🤖**
