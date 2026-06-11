# 🌾 TanahPulih — Smart Paddy Monitoring App

A polished mobile-first React application for Malaysian paddy farmers, featuring crop health monitoring, AI disease detection, weather alerts, and stakeholder analytics.

---

## 📱 Screenshots

The app includes 14 screens:
1. Splash Screen
2. Onboarding (3 steps)
3. Login
4. Home Dashboard
5. Crop Status (Map & Index View)
6. Scan Leaf
7. Diagnosis Result
8. Alerts
9. AI Assistant
10. Recommendations
11. Profile
12. Stakeholder Dashboard

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/tanahpulih.git
cd tanahpulih

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🏗️ Build

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🌐 Deploy to GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json scripts:**
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. **Update vite.config.js base:**
```js
base: '/tanahpulih/'  // replace with your repo name
```

4. **Deploy:**
```bash
npm run build
npm run deploy
```

5. Enable GitHub Pages in repo Settings → Pages → select `gh-pages` branch.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| Tailwind CSS | Styling |
| React Router v6 | Navigation |
| Recharts | Data Visualization |
| Framer Motion | Animations |
| Lucide React | Icons |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── StatusBar.jsx      # Mobile status bar
│   ├── BottomNav.jsx      # Farmer app navigation
│   └── StakeholderBottomNav.jsx
├── pages/
│   ├── SplashScreen.jsx
│   ├── OnboardingScreen.jsx
│   ├── LoginScreen.jsx
│   ├── HomeScreen.jsx
│   ├── CropStatusScreen.jsx
│   ├── ScanLeafScreen.jsx
│   ├── DiagnosisScreen.jsx
│   ├── AlertsScreen.jsx
│   ├── AssistantScreen.jsx
│   ├── RecommendationsScreen.jsx
│   ├── ProfileScreen.jsx
│   └── StakeholderScreen.jsx
├── data/
│   └── mockData.js        # Realistic Malaysian paddy farm data
├── App.jsx                # Routing
├── main.jsx               # Entry point
└── index.css              # Global styles
```

---

## 🎨 Color Palette

| Name | Hex |
|---|---|
| Primary Green | `#2E7D32` |
| Secondary Green | `#4CAF50` |
| Light Green | `#E8F5E9` |
| Background | `#F8F9F4` |
| Alert Red | `#E53935` |
| Warning Orange | `#FB8C00` |
| Healthy Green | `#43A047` |

---

## 📊 Mock Data Regions

- **Selangor** — 45 farms, 82% healthy
- **Kedah** — 38 farms, 75% healthy  
- **Perak** — 45 farms, 79% healthy

---

## 🌱 About TanahPulih

TanahPulih is a smart agriculture platform built for paddy farmers in Malaysia. It helps farmers:
- Monitor crop health using satellite NDVI/EVI data
- Detect leaf diseases using AI
- Receive weather and crop stress alerts
- Chat with an AI farming assistant
- Connect institutional stakeholders (BERNAS) to farm analytics

Built as a portfolio-ready MVP prototype.
