# Project Goals: Net Worth Command Center

This document outlines the structure and goals of the Net Worth Command Center project.

## Backend Structure

### Database Models (`backend/models.py`)

- **User**: Stores user-specific information, including filing status and state of residence.
- **Income**: Manages user income, with support for both hourly and salary-based income types.
- **Investment**: Tracks user investments, including ticker symbols, number of shares, and cost basis.

### Tax Logic (`tax_logic.py`)

- **Federal Taxes**: Implements federal tax calculations for 2026, including standard deductions and tax brackets for single filers.
- **State Taxes**: Includes state-specific tax logic, starting with California for 2026. The system is designed to be extensible for other states.

## Frontend (React)

The frontend is a React application that provides the user interface for the Net Worth Command Center.

- **`public/index.html`**: The main entry point for the web application.
- **`src/App.js`**: The main application component.
- **`src/index.js`**: The JavaScript entry point.

## Project Roadmap

1.  ** fleshing out the database models.**
2.  ** adding more filing statuses and states to the tax logic.**
3.  ** building out the frontend to interact with the backend.**
4.  **Implementing user authentication and data persistence.**
5.  **Adding features for tracking expenses, net worth, and other financial metrics.**
