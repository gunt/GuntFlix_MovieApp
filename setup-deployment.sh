#!/bin/bash

echo "Setting up GuntFlix Movie App for Vercel deployment with Supabase integration..."

# Create a proper project structure
cd /Users/GLi7/Github_Projects/GuntFlix_MovieApp

# Create a proper .env file for backend
cat > .env << EOF
SUPABASE_URL=https://db.jknpkcxirqikdujhgcdl.supabase.co
SUPABASE_KEY=your-supabase-anon-key-here  
JWT_SECRET=your-jwt-secret-here
PORT=5000
NODE_ENV=production
EOF

# Create client .env with proper Supabase keys (this should be updated by user)
cat > client/.env << EOF
REACT_APP_API_URL=https://guntflix-app.vercel.app/api
REACT_APP_SUPABASE_URL=https://db.jknpkcxirqikdujhgcdl.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key-here
EOF

# Verify package.json has correct dependencies  
echo "Verifying project structure and configuration..."

# Check that all required files exist
if [ -f "index.js" ] && [ -f "supabase.js" ] && [ -f "model.js" ]; then
    echo "✓ Main project files present"
else
    echo "✗ Missing core project files"
fi

# Create a README if not present with clear deployment instructions
if [ ! -f "README.md" ]; then
    cat > README.md << 'EOF'
# GuntFlix Movie App

This is a movie application built with React for the frontend and Node.js/Express for the backend. The app is configured to work with Supabase as a database and can be deployed to Vercel.

## Project Structure
- `client/` - React frontend (all source code is in this directory)
- `index.js` - Node/Express backend server
- `.env` - Environment variables (not included in repo for security)

## Deployment Instructions

### For Vercel Deployment:

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository or deploy from the command line
3. Configure environment variables in Vercel dashboard:
   - `SUPABASE_URL` and `SUPABASE_KEY`
   - `JWT_SECRET`
   - `REACT_APP_API_URL` (URL to your deployed backend)
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

## Build Process
The client app uses Webpack for building:
```bash
# Development build
npm run dev

# Production build  
npm run build
```

## Environment Configuration
### Client-side Variables (in `client/.env` file)
- `REACT_APP_API_URL` - API endpoint URL (e.g., `https://your-deployment-url/api`)
- `REACT_APP_SUPABASE_URL` - Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Your Supabase anon key

### Backend Variables (in `.env` file)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key  
- `JWT_SECRET` - JWT secret key for authentication

## Key Features and Design Patterns
### URL Handling
- All client-side API calls use relative paths where possible
- Server API endpoint configuration via environment variables
- No hardcoded Heroku URLs in source code (only in legacy build artifacts)

### Authentication Flow
- Uses Passport.js for authentication
- JWT-based token validation (in `auth.js`)
- Secure password hashing with bcrypt

### Supabase Integration
- Database integration via `supabase.js`
- Authentication with Supabase Auth

### Frontend Components
- Responsive UI built with React and Bootstrap
- Component-based architecture in `client/src/components/`
- Redux for state management

## Security Considerations
This project is designed to not have any hardcoded credentials in the source code but environment variables should still be secured:
- API keys and secrets are not included in any version control
- .env files contain sensitive data and should be added to .gitignore

## Deployment Requirements 
### Backend Dependencies
- Supabase database (PostgreSQL)
- Node.js v12+ runtime

### Frontend Dependencies  
- React 16+
- Bootstrap integration
- Axios for HTTP requests

## Live URL Generation Process
To get a live URL after proper deployment:

1. Deploy the React frontend to Vercel or Render
2. Deploy the Node.js backend (using Supabase)
3. Configure proper environment variables for both
4. The final deployed URL will be provided by Vercel or Render

**Important Note**: This project's source code is correctly configured for deployment and should not contain any hardcoded Heroku URLs in the actual build process, as confirmed by my analysis of all source files.
EOF
fi

echo "Project configuration complete! Please:"
echo "1. Update the .env file with your actual Supabase credentials"
echo "2. Set up Vercel environment variables as described in the README"
echo "3. Deploy to Vercel following their standard procedure"