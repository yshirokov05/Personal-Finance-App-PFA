# Personal Finance App (PFA) - Net Worth Command Center

  ## 🎯 Project Overview
  A comprehensive personal finance application designed to track variable income, manual asset growth, and live tax estimates. PFA provides a centralized dashboard for monitoring net worth, investment performance, and tax liabilities across all 50 US states.

  ## 👤 Solo Project
  This project is a solo development effort focused on building a robust, privacy-first financial management tool with high-accuracy tax logic and real-time market integrations.

  ## 💰 Core Features

  ### 🏦 Dashboard & Net Worth Tracking
  - **Live Asset Values**: Real-time stock and bond price tracking via `yfinance`.
  - **Debt Management**: Track remaining balances, interest rates, and monthly payments.
  - **Dynamic Portfolio**: Manage multiple asset types (IRA, 401k, Brokerage, Cash, Real Estate).

  ### 📈 Variable Income & Tax Estimation
  - **Flexible Income Tracking**: Supports both hourly wages and annual salaries.
  - **50-State Tax Engine**: Integrated federal and state tax calculations for all 50 US states (2026 tax year).
  - **Tax Liability Estimation**: Breakdown of estimated Federal, State, and FICA taxes.

  ### 🔐 Authentication & Data Privacy
  - **Secure Login**: Firebase Authentication with Email/Password and Google Sign-In support.
  - **Guest Mode**: Explore all features using a demo profile without an account.
  - **Firestore Integration**: Persistent data storage for registered users with secure authorization.

  ## 🛠️ Tech Stack
  - **Frontend**: React (19.x), Tailwind CSS (3.x), Lucide-React, Recharts.
  - **Backend**: Firebase Cloud Functions (Python 3.12 runtime), Firestore Database, Firebase Hosting.
  - **APIs**: `yfinance` for real-time market data.

  ## 🚀 Getting Started

  ### Prerequisites
  - Node.js (v18 or higher)
  - Firebase CLI
  - Python 3.12 (for local backend development)

  ### Frontend Installation
  ```bash
  cd frontend
  npm install
  npm start
  ```

  ### Backend Installation
  ```bash
  cd backend
  python -m venv venv
  source venv/bin/activate  # On Windows: .\venv\Scripts\activate
  pip install -r requirements.txt
  ```

  ### Build & Deploy
  ```bash
  # Build frontend
  cd frontend
  npm run build

  # Deploy everything to Firebase
  firebase deploy
  ```

  ## 📦 Configuration
  Create a `.env` file in the `frontend` directory with your Firebase project details:
  ```env
  REACT_APP_FIREBASE_API_KEY=your_api_key
  REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
  REACT_APP_FIREBASE_PROJECT_ID=your_project_id
  REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  REACT_APP_FIREBASE_APP_ID=your_app_id
  ```

  ## 🗂️ Project Structure
  ```
  /backend
    /api.py           # Flask-based API for Cloud Functions
    /tax_logic.py     # 50-state tax calculation engine
    /firestore_db.py  # Data persistence layer
    /price_service.py # Market data integration
  /frontend
    /src
      /components     # UI components (Dashboard, AssetTable, etc.)
      /context        # AuthContext for state management
      /firebase       # Firebase initialization
  ```

  ## 🎯 Project Goals
  For a detailed roadmap of completed features and future development, please see [PROJECT_GOALS.md](PROJECT_GOALS.md).

  ## 📝 License
  Personal project - All rights reserved
  Initial setup completed with Claude Code automation.
  Current status: **Live & Deployed**
