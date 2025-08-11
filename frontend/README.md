# GitHub Upload Guide - URL Shortener with Database

## 📋 Prerequisites

1. Git installed on your system
2. GitHub account created
3. MongoDB database (local or cloud)
4. Your project is ready and working locally

## 🚀 Step-by-Step Upload Process

### Step 1: Prepare Your Project for GitHub

#### 1.1 Create .gitignore file

Create a `.gitignore` file in your project root to exclude sensitive files:

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Uploads (if any)
uploads/
```

#### 1.2 Create README.md

Create a comprehensive README.md file:

````markdown
# URL Shortener

A simple URL shortener application built with Node.js, Express, and MongoDB.

## Features

- Shorten long URLs
- Track visit counts
- Admin panel for managing URLs
- Responsive web interface

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Vite
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```
````

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file:
   ```bash
   cp .env.example .env
   ```
4. Update .env with your configuration
5. Start server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:5000
ADMIN_TOKEN=your_admin_token_here
```

## API Endpoints

- `POST /api/shorten` - Shorten a URL
- `GET /api/admin` - Get all URLs (admin only)
- `GET /:shortcode` - Redirect to original URL

## Database Schema

```javascript
{
  original_url: String,
  short_code: String,
  visits: Number,
  createdAt: Date
}
```

````

### Step 2: Initialize Git Repository

```bash
# Navigate to your project root
cd url-shortener

# Initialize git repository
git init

# Add all files (except those in .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: URL Shortener with MongoDB"
````

### Step 3: Create GitHub Repository

#### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed
# Then login:
gh auth login

# Create repository
gh repo create url-shortener --public --source=. --remote=origin --push
```

#### Option B: Using GitHub Web Interface

1. Go to https://github.com
2. Click "New repository"
3. Name it "url-shortener"
4. Choose "Public" or "Private"
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 4: Connect Local to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/url-shortener.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 5: Database Options for GitHub

#### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update your `.env` file with the Atlas connection string

#### Option 2: Local MongoDB

- Ensure MongoDB is running locally
- Use connection string: `mongodb://localhost:27017/url_shortener`

### Step 6: Database Backup & Seed Data

#### 6.1 Create Database Backup Script

Create `scripts/backup-db.js`:

```javascript
const mongoose = require("mongoose");
const Url = require("../models/Url");
require("dotenv").config();

async function backupDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const urls = await Url.find({});
    console.log("Database backup:", JSON.stringify(urls, null, 2));

    // Save to file
    const fs = require("fs");
    fs.writeFileSync("database-backup.json", JSON.stringify(urls, null, 2));

    console.log("Backup saved to database-backup.json");
    process.exit(0);
  } catch (error) {
    console.error("Backup failed:", error);
    process.exit(1);
  }
}

backupDatabase();
```

#### 6.2 Create Seed Data Script

Create `scripts/seed-db.js`:

```javascript
const mongoose = require("mongoose");
const Url = require("../models/Url");
require("dotenv").config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Url.deleteMany({});

    // Add sample data
    const sampleUrls = [
      {
        original_url: "https://www.google.com",
        short_code: "abc123",
        visits: 10,
        createdAt: new Date(),
      },
      {
        original_url: "https://github.com",
        short_code: "def456",
        visits: 5,
        createdAt: new Date(),
      },
    ];

    await Url.insertMany(sampleUrls);
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
```

### Step 7: Final Push with Database

```bash
# Add new files
git add .

# Commit database scripts and documentation
git commit -m "Add database scripts and documentation"

# Push to GitHub
git push origin main
```

### Step 8: Database Connection for Production

#### 8.1 MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update your `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url_shortener
   ```

#### 8.2 Environment Variables for Production

Create separate environment files:

- `.env.development` for local development
- `.env.production` for production

### Step 9: Deploy with Database

#### Option 1: Heroku (with MongoDB Atlas)

```bash
# Install Heroku CLI
# Create Heroku app
heroku create url-shortener-app

# Add MongoDB Atlas addon
heroku addons:create mongolab

# Deploy
git push heroku main
```

#### Option 2: Vercel (with MongoDB Atlas)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Step 10: Post-Upload Verification

1. **Test the deployed application**:

   - Visit your deployed URL
   - Test URL shortening functionality
   - Test admin panel access

2. **Verify database connection**:

   - Check if data persists across deployments
   - Test with sample URLs

3. **Update README**:
   - Add deployment URLs
   - Update installation instructions for production

## 🎯 Quick Start Commands

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

## 📊 Database Management Commands

```bash
# Backup database
node scripts/backup-db.js

# Seed database with sample data
node scripts/seed-db.js

# Reset database
node scripts/seed-db.js
```

## 🚨 Important Notes

1. **Never commit .env file** with real credentials
2. **Use environment variables** for all sensitive data
3. **Test thoroughly** before pushing to production
4. **Keep database backups** regularly
5. **Use MongoDB Atlas** for production deployments

This guide covers everything from initial setup to production deployment with database integration. Follow each step carefully and you'll have your URL shortener successfully uploaded to GitHub with database support.
