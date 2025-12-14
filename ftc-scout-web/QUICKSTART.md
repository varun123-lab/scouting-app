# FTC Scout Web App - Quick Start Guide

## 🚀 Your Web App is Ready!

I've successfully converted your iOS FTC scouting app into a fully functional web application!

## 📂 Project Location

```
/Users/varunbarmavat/Documents/FTC01/ftc-scout-web/
```

## ✅ What's Been Built

### Complete MVP Features
- ✅ **Login System** - Local storage-based authentication
- ✅ **Scouting Form** - Full autonomous, tele-op, and metrics capture
- ✅ **Auto Path Drawing** - HTML5 Canvas with touch support
- ✅ **Dashboard** - View entries grouped by user with calculated points
- ✅ **Detail View** - Edit and delete functionality
- ✅ **Analytics** - Team averages, user stats, and comparison views
- ✅ **CSV Export** - Download all your scouting data
- ✅ **Dark Theme** - Sleek black theme matching your iOS app
- ✅ **Mobile Responsive** - Works great on phones, tablets, and desktops

## 🎯 How to Use

### Starting the App

The development server is currently running at:
**http://localhost:5173/**

Open this URL in your browser to start using the app!

### If you need to restart the server:

```bash
cd /Users/varunbarmavat/Documents/FTC01/ftc-scout-web
npm run dev
```

### Building for Production

```bash
cd /Users/varunbarmavat/Documents/FTC01/ftc-scout-web
npm run build
```

The optimized production files will be in `dist/` folder, ready to deploy to any web host.

## 📱 Using the App

### 1. Login
- Enter your name and team number
- Click "Start Scouting"

### 2. Create Entries
- Go to "New Entry" tab
- Fill in team information
- Add autonomous data (points, classification, etc.)
- Draw the auto path on the field canvas
- Enter tele-op metrics
- Save the entry

### 3. View Dashboard
- See all your entries with calculated points
- Switch between "My Entries" and "All Users"
- Click any entry to view full details
- Edit or delete your entries

### 4. Analytics
- View team averages
- Compare your stats with other scouts
- See all teams comparison
- Export data as CSV

## 🎨 Key Features

### Auto Path Drawing
- Touch/mouse drawing on field diagram
- Clear and redraw functionality
- Saves as image with entry

### Automatic Scoring
Formula: `(Artifacts × 3) + Autonomous Total`

### Data Storage
- All data stored in browser LocalStorage
- Per-user data isolation
- Persistent across sessions
- Export to CSV for backup

## 📊 Data Structure

Each scouting entry includes:
- Team information
- Autonomous: total, leave, classification, overflow, path image
- Tele-op: artifacts scored, cycle time, play style, top/bot
- Calculated points (automatic)
- Timestamp and user info

## 🌐 Deployment Options

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
cd /Users/varunbarmavat/Documents/FTC01/ftc-scout-web
vercel
```

### Option 2: Netlify
1. Run `npm run build`
2. Drag the `dist/` folder to netlify.com/drop

### Option 3: GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Point to `dist/` folder

## 🔧 Customization

### Change Field Image
Edit `src/components/AutoPathCanvas.tsx` line ~35:
```typescript
fieldImage.src = '/path/to/your-field-image.png';
```

### Modify Scoring
Edit `src/utils/scoring.ts`:
```typescript
export function calculatePoints(entry: Partial<ScoutingEntry>): number {
  // Your custom formula here
}
```

### Update Theme Colors
Edit `src/App.css` CSS variables:
```css
:root {
  --accent-blue: #007AFF;
  --accent-green: #34C759;
}
```

## 📁 Project Structure

```
src/
├── components/          # UI components
│   ├── LoginView.tsx
│   ├── DashboardView.tsx
│   ├── ScoutingView.tsx
│   ├── ScoutingDetailView.tsx
│   ├── AveragesView.tsx
│   └── AutoPathCanvas.tsx
├── context/            # State management
│   └── AppContext.tsx
├── services/           # Data services
│   └── storage.ts
├── types/             # TypeScript types
│   └── index.ts
├── utils/             # Helper functions
│   └── scoring.ts
├── App.tsx            # Main component
├── App.css            # Global styles
└── main.tsx           # Entry point
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Dependencies Issues
```bash
cd /Users/varunbarmavat/Documents/FTC01/ftc-scout-web
rm -rf node_modules package-lock.json
npm install
```

### Clear Browser Storage
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear Local Storage
4. Refresh page

## 🚀 Next Steps (Future Enhancements)

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Team API integration
- [ ] Progressive Web App (PWA)
- [ ] Advanced charts/graphs
- [ ] Season-specific scoring modules
- [ ] Match scheduling integration
- [ ] Real-time collaboration

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS/Android)

## 💡 Tips

1. **Backup Data**: Use the CSV export regularly
2. **Test on Mobile**: Open on your phone for the best scouting experience
3. **Multiple Scouts**: Each person logs in with their own name
4. **Offline**: Works without internet after first load
5. **Drawing**: Use a stylus for precise auto path drawings

## 🎉 Success!

Your FTC Scout web app is now live and running at http://localhost:5173/

All the features from your iOS app MVP are now available on the web with:
- Dark theme ✨
- Touch support 📱
- Auto path drawing 🎨
- Real-time calculations 🔢
- Data export 📊

Happy scouting! 🤖

---

**Need Help?** Check the README.md for full documentation.
