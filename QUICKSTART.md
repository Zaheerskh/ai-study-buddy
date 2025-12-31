# Quick Start Guide

## Prerequisites Checklist
- [ ] Node.js installed (v16+)
- [ ] MongoDB Atlas account (or local MongoDB)
- [ ] OpenAI API key

## Step-by-Step Setup

### 1. Backend Setup (5 minutes)

```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
OPENAI_API_KEY=your-openai-api-key-here
CLIENT_URL=http://localhost:5173
```

Seed test user:
```bash
npm run seed
```

Start server:
```bash
npm start
# or
npm run dev  # for auto-reload
```

### 2. Frontend Setup (3 minutes)

```bash
cd client
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

### 3. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### 4. Login

Use test credentials:
- Username: `test`
- Password: `admin`

Or create a new account!

## Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI in `.env`
- Check network/firewall settings
- Ensure MongoDB Atlas IP whitelist includes your IP

### OpenAI API Issues
- Verify your API key is correct
- Check API key has sufficient credits
- Review rate limits

### Port Already in Use
- Change PORT in server/.env
- Update CLIENT_URL and VITE_API_URL accordingly

## Next Steps

1. Create your first study material
2. Explore the Study Room features
3. Customize the application for your needs

Happy studying! 📚

