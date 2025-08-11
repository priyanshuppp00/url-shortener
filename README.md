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
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file:
   ```bash
   cp .env.example .env
   ```
4. Update .env with your configuration:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   BASE_URL=http://localhost:5000
   ADMIN_TOKEN=your_admin_token_here
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

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open http://localhost:5173 in your browser
4. Use the admin panel to manage URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
