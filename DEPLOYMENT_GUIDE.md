# GuntFlix Movie App - Deployment Setup

## Project Overview
This project is a movie application with React frontend and Node.js/Express backend that uses Supabase as the database. It's designed to be deployed on Vercel.

## Configuration Required

### Environment Variables (create .env file)
```
SUPABASE_URL=https://db.jknpkcxirqikdujhgcdl.supabase.co
SUPABASE_KEY=your-supabase-anon-key-here  
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

### Frontend Configuration (client/.env)
```
REACT_APP_API_URL=https://guntflix-app.vercel.app/api
REACT_APP_SUPABASE_URL=https://db.jknpkcxirqikdujhgcdl.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

## Deployment to Vercel

### Backend Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@now/node"
    },
    {
      "src": "client/package.json",
      "use": "@now/static-build",
      "config": {
        "distDir": "client/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/index.html"
    }
  ]
}
```

### Build Process
1. Backend: Node.js server with Supabase integration  
2. Frontend: React app built with Webpack for Vercel deployment

### Required Supabase Setup
- Create a `movies` table with columns: title, description, genre_name, director_name, etc.
- Create a `users` table with columns: username, password, email, birthday, favorite_movies

## Deployment Steps
1. Create a Vercel project and connect to this repository  
2. Set environment variables in Vercel dashboard
3. Deploy the project - backend will run on root path, frontend at /client 
4. Configure Supabase tables with sample data if needed

## API Endpoints
- GET /movies - Get all movies  
- GET /users - Get all users
- POST /users - Create new user
- GET /movies/:Title - Get specific movie by title
- POST /users/:Username/movies/:MovieID - Add favorite movies

## Troubleshooting
If deployment fails:
1. Ensure all environment variables are set in Vercel dashboard  
2. Check that Supabase tables exist and have proper schema
3. Verify the client package.json has correct build configuration

## Security Notes
- Never commit sensitive environment variables to version control  
- Use Vercel's dashboard for secure environment variable management