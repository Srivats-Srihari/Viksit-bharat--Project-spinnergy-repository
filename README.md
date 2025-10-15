# Spinnergy App

A spinning wheel game app with user authentication, leaderboards, and an 
admin dashboard.

## Features

- Spinning wheel game with animated spins and random rewards.

- User registration/login with JWT authentication.

- Leaderboard displaying top scores, updated in real-time.

- User profile with score history.

- Admin dashboard for managing users.

- Dark mode toggle and responsive design.

## Technology Stack

- **Frontend:** React, Tailwind CSS, React Router.

- **Backend:** Node.js, Express, MongoDB (Mongoose).

- **Security:** JWT, Helmet, CORS, express-rate-limit.

- **Deployment:** Render (static & web services).

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)

- npm or yarn

- (Optional) MongoDB instance or Atlas connection URI.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/spinnergy.git
cd spinnergy
```

2. Install dependencies:

```bash
npm run install-all
```

3. Configure environment variables. Copy `.env.example` to `.env` and fill in 
the values:

```.env
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
PORT=5000
OPENAI_API_KEY=your_openai_api_key
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development servers:

```bash
npm run dev
```

- The backend runs on `http://localhost:5000/`
- The frontend runs on `http://localhost:3000/`

5. Build for production:

```bash
npm run build-client
```

### Deployment

- The `render.yaml` is configured for deploying the frontend as a static site 
and the backend as a web service on Render.com.

- For any deployment, ensure environment variables are set in the hosting 
platform (MONGO_URI, JWT_SECRET, OPENAI_API_KEY, etc.).
