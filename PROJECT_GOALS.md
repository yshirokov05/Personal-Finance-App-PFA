# Project Goals: Net Worth Command Center

This document outlines the structure, completed features, and future goals of the Net Worth Command Center project.

## 🛠️ Completed Features

### Backend & Core Logic
- **Comprehensive Tax Logic**: Implemented federal and state tax calculations for all 50 US states (2026 tax year), including standard deductions and progressive tax brackets.
- **Real-Time Market Data**: Integrated `yfinance` to fetch live prices for stock and bond investments.
- **Serverless Architecture**: Successfully deployed backend logic as Firebase Cloud Functions (Python 3.12) with optimized initialization.
- **Secure Persistence**: Firestore database integration for saving and retrieving user-specific income, asset, and debt data.

### Frontend (React)
- **Interactive Dashboard**: Real-time net worth calculation and visualization of asset/debt allocations.
- **Dynamic Portfolio Management**: Users can add, edit, and delete incomes (Salary/Hourly), assets (Stocks, Bonds, Real Estate, Cash), and debts.
- **Robust Authentication**: 
  - Integrated Firebase Auth (Email/Password and Google Sign-In).
  - **Guest Mode**: Allows users to explore the app's functionality without an account using demo data.
  - **Account Conversion**: Settings tab prompt for guest users to register a permanent account.
- **Live Tax Estimation**: Dynamic calculation of Federal, State, and FICA tax liabilities based on user-provided income and filing status.

## 🚀 Project Roadmap

### Short-Term Goals (Next Steps)
- **Future Net Worth Prediction**: Implement a growth model to project net worth over 5, 10, and 20-year horizons based on current savings and historical market returns.
- **Tax Payment Tracking**: 
    - Allow users to log taxes already paid (from paystubs).
    - Display "Tax Gap" (estimated liability vs. taxes paid).
- **Real Post-Tax Income**: Show a detailed breakdown of "Take-Home" pay after all estimated taxes and FICA.
- **Enhanced UI/UX**:
    - Add charts for historical net worth tracking (using Firestore for snapshots).
    - Improve mobile responsiveness for better on-the-go tracking.

### Long-Term Goals
- **Cross-Platform Availability**: 
    - Develop downloadable mobile applications (React Native or Flutter).
- **Personalized Financial Guidance**:
    - AI-driven strategies based on age, goals, and spending habits.
    - Identify "leakage" (unnecessary subscriptions or impulse buys).
- **Automated Integration**:
    - **Brokerage Sync**: (Plaid or similar) to automatically update stock quantities.
    - **Bank Sync**: Automate cash balance and transaction tracking.
    - **Payroll Sync**: Direct integration with services like ADP for precise tax data.
