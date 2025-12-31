# AI Study Buddy - Full MERN Stack Application

A comprehensive study assistant application that leverages AI to transform your notes into interactive flashcards, quiz questions, and study guides. Built with the MERN stack (MongoDB, Express.js, React, Node.js) with OpenAI integration.

![AI Study Buddy](https://via.placeholder.com/800x400?text=AI+Study+Buddy+Screenshot)

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **AI-Powered Generation**: Automatically generate study materials using OpenAI
  - Interactive flashcards for active recall
  - Multiple-choice quiz questions with explanations
  - Comprehensive study guides
- **Study Room**: Practice with flashcards and quizzes in an interactive interface
- **Dashboard**: Manage all your study materials in one place
- **CRUD Operations**: Create, read, update, and delete study materials
- **Tagging System**: Organize materials with custom tags
- **Responsive Design**: Modern UI built with TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI content generation
- **express-rate-limit** - Rate limiting middleware

## 📁 Project Structure

```
ai-study-buddy/
│
├── client/                      # React + Vite Frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Notification.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── StudyRoom.jsx
│   │   ├── services/            # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── server/                      # Express + Node Backend
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── seed.js              # Seed script for test user
│   ├── controllers/             # Route controllers
│   │   ├── authController.js
│   │   └── studyMaterialController.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/                  # Mongoose models
│   │   ├── User.js
│   │   └── StudyMaterial.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   └── studyMaterialRoutes.js
│   ├── services/
│   │   └── aiService.js         # OpenAI integration
│   ├── utils/
│   │   └── generateToken.js     # JWT token generation
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- OpenAI API key

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   OPENAI_API_KEY=your-openai-api-key
   CLIENT_URL=http://localhost:5173
   ```

4. **Seed test user** (optional)
   ```bash
   npm run seed
   ```
   This creates a test user:
   - Username/Email: `test`
   - Password: `admin`

5. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 🪟 Windows Setup Instructions

### Installing Node.js on Windows

1. **Download Node.js**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS (Long Term Support) version for Windows
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Install Node.js**
   - Run the downloaded installer
   - Follow the installation wizard
   - Accept the license agreement
   - Keep default installation settings
   - Check "Automatically install the necessary tools" if prompted
   - Click "Install" and wait for completion

3. **Verify Installation**
   - Open PowerShell or Command Prompt
   - Run the following commands:
     ```powershell
     node --version
     npm --version
     ```
   - You should see version numbers (Node.js v16+ required)

### Installing MongoDB on Windows

**Option 1: MongoDB Atlas (Recommended - Cloud Database)**

1. **Create Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Configure Database Access**
   - Go to "Database Access"
   - Add a new database user
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set user privileges to "Atlas admin"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ai-study-buddy` or your preferred database name

**Option 2: Local MongoDB Installation**

1. **Download MongoDB Community Server**
   - Visit [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Select Windows as your platform
   - Choose MSI package
   - Download and run the installer

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional but helpful)

3. **Verify Installation**
   - Open Command Prompt as Administrator
   - MongoDB should start automatically as a service
   - Connection string for local MongoDB: `mongodb://localhost:27017/ai-study-buddy`

### Cloning the Repository on Windows

**Using PowerShell:**

1. Open PowerShell (right-click Start menu → Windows PowerShell)
2. Navigate to your desired directory:
   ```powershell
   cd C:\Users\YourUsername\Documents
   ```
3. Clone the repository:
   ```powershell
   git clone <repository-url>
   cd Project
   ```

**Using Command Prompt (CMD):**

1. Open Command Prompt (Win + R → type `cmd` → Enter)
2. Navigate to your desired directory:
   ```cmd
   cd C:\Users\YourUsername\Documents
   ```
3. Clone the repository:
   ```cmd
   git clone <repository-url>
   cd Project
   ```

### Running Backend on Windows

1. **Open Terminal**
   - Open PowerShell or Command Prompt
   - Navigate to the server directory:
     ```powershell
     cd server
     ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Create `.env` File**
   
   **Option A: Using PowerShell**
   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```
   
   **Option B: Using Command Prompt**
   ```cmd
   copy .env.example .env
   notepad .env
   ```
   
   Edit the `.env` file with your configuration (see Environment Variables section above).

4. **Run Seed Script (Optional)**
   ```powershell
   npm run seed
   ```
   This creates the test user (username: `test`, password: `admin`).

5. **Start Server**
   ```powershell
   npm start
   ```
   Or for development with auto-reload:
   ```powershell
   npm run dev
   ```

### Running Frontend on Windows

1. **Open a New Terminal Window**
   - Open a new PowerShell or Command Prompt window
   - Navigate to the client directory:
     ```powershell
     cd client
     ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Create `.env` File**
   
   **Using PowerShell:**
   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```
   
   **Using Command Prompt:**
   ```cmd
   copy .env.example .env
   notepad .env
   ```
   
   Add: `VITE_API_URL=http://localhost:5000/api`

4. **Start Development Server**
   ```powershell
   npm run dev
   ```

### Windows-Specific Notes

1. **Environment Variables**
   - Windows uses `set` instead of `export` for environment variables in CMD
   - In PowerShell, you can use `$env:VARIABLE_NAME="value"` for session variables
   - For `.env` files, the application uses `dotenv` package, so no manual `set` commands needed

2. **PowerShell vs Command Prompt**
   - Both work for this project
   - PowerShell is recommended for better compatibility
   - Some commands may differ (e.g., `Copy-Item` in PowerShell vs `copy` in CMD)

3. **File Paths**
   - Use backslashes (`\`) in Windows paths: `C:\Users\...`
   - Forward slashes (`/`) also work in Node.js/JavaScript
   - PowerShell handles both path separators

4. **Port Conflicts**
   - If port 5000 or 5173 is already in use:
     ```powershell
     # Find process using port 5000
     netstat -ano | findstr :5000
     
     # Kill process (replace PID with the number from above)
     taskkill /PID <PID> /F
     ```
   - Or change ports in `.env` files

5. **Long Path Names**
   - Windows may have issues with very long file paths
   - If you encounter errors, enable long paths:
     - Run PowerShell as Administrator
     - Execute: `New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force`

6. **Firewall/Antivirus**
   - Windows Defender or antivirus may block Node.js
   - Add exceptions if you encounter connection issues
   - Allow Node.js through Windows Firewall when prompted

7. **Running Multiple Terminals**
   - You'll need two terminal windows open simultaneously:
     - One for the backend server (in `server` folder)
     - One for the frontend server (in `client` folder)
   - Windows Terminal (available in Microsoft Store) allows tabs for easier management

## 🔐 Environment Variables

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Client (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 📖 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Study Materials

- `GET /api/study-materials` - Get all study materials (protected)
- `GET /api/study-materials/:id` - Get single study material (protected)
- `POST /api/study-materials` - Create new study material with AI generation (protected)
- `PUT /api/study-materials/:id` - Update study material (protected)
- `DELETE /api/study-materials/:id` - Delete study material (protected)

## 🎯 Usage

1. **Sign Up / Login**
   - Create a new account or use test credentials:
     - Username: `test`
     - Password: `admin`

2. **Create Study Material**
   - Go to Dashboard
   - Click "Create New"
   - Enter title and content
   - Add optional tags
   - Click "Generate Study Materials"
   - Wait for AI to generate flashcards, quiz questions, and study guide

3. **Study Room**
   - Click "Study" on any material card
   - Switch between:
     - **Flashcards**: Click to flip, navigate with Previous/Next
     - **Quiz**: Answer multiple-choice questions, view results
     - **Study Guide**: Read comprehensive study guide

4. **Manage Materials**
   - View all materials on Dashboard
   - Delete materials you no longer need

## 🎬 Demo Video Outline (5-7 minutes)

### 1. Introduction (30 seconds)
- Brief overview of the application
- Key features and use cases

### 2. Login with Test User (30 seconds)
- Navigate to login page
- Use credentials: `test` / `admin`
- Show successful authentication

### 3. Dashboard Overview (1 minute)
- Explain the dashboard interface
- Show existing materials (if any)
- Demonstrate the create form

### 4. Create New Study Material (2 minutes)
- Click "Create New"
- Enter sample study content (e.g., a paragraph about a topic)
- Add title and tags
- Submit and show AI generation process
- Explain the three types of generated content

### 5. View/Edit/Delete Materials (1 minute)
- Show material cards with metadata
- Demonstrate navigation to study room
- Show delete functionality

### 6. Study Room Demonstration (2 minutes)
- **Flashcards Mode**:
  - Show flashcard interface
  - Demonstrate flip animation
  - Navigate between flashcards
- **Quiz Mode**:
  - Show quiz questions
  - Answer a few questions
  - Submit and view results with explanations
- **Study Guide Mode**:
  - Show formatted study guide
  - Highlight organization and readability

### 7. Logout (30 seconds)
- Demonstrate logout functionality
- Show redirect to home page

## 🚢 Deployment

### Backend Deployment (Example: Heroku/Railway/Render)

1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas connection string is configured
3. Update `CLIENT_URL` to your frontend URL
4. Deploy the server

### Frontend Deployment (Example: Vercel/Netlify)

1. Set `VITE_API_URL` to your deployed backend URL
2. Build the application: `npm run build`
3. Deploy the `dist` folder

### Environment Variables for Production

Ensure all environment variables are set correctly:
- Use strong `JWT_SECRET` in production
- Set `NODE_ENV=production`
- Update CORS settings for production domain
- Secure your OpenAI API key

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Rate limiting on API endpoints
- CORS configuration
- Input validation

## 🎥 Video Demonstration Checklist

Use this checklist when creating your demo video (recommended 5-7 minutes):

### Preparation (Before Recording)
- [ ] Ensure test user is seeded (`npm run seed` in server directory)
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 5173
- [ ] MongoDB connection is active
- [ ] OpenAI API key is configured

### 1. Authentication Demonstration (1-2 minutes)
- [ ] Start on the Home page
- [ ] Navigate to Login page
- [ ] Show login form with validation (try submitting empty form)
- [ ] Login with test credentials:
  - Username: `test`
  - Password: `admin`
- [ ] Show successful redirect to Dashboard
- [ ] Logout and return to home page
- [ ] Navigate to Signup page
- [ ] Show signup form validation (try invalid email, short password, password mismatch)
- [ ] Create a new account (optional - can skip if time is limited)

### 2. Protected Routes Demonstration (30 seconds)
- [ ] While logged out, try to access `/dashboard` directly
- [ ] Show redirect to login page
- [ ] Explain that protected routes require authentication
- [ ] Login to proceed

### 3. Dashboard Overview (30 seconds)
- [ ] Show dashboard layout and navigation
- [ ] Explain the "Create New" button
- [ ] Show empty state if no materials exist, or existing materials if any

### 4. CRUD Operations - Create (1-2 minutes)
- [ ] Click "Create New" button
- [ ] Fill in the form:
  - Enter a descriptive title (e.g., "JavaScript Basics")
  - Paste or type study content (2-3 paragraphs)
  - Add tags (e.g., "programming", "javascript", "web")
- [ ] Click "Generate Study Materials"
- [ ] Show loading indicator during AI generation
- [ ] Explain that AI is generating:
  - Flashcards
  - Quiz questions
  - Study guide
- [ ] Show success notification
- [ ] Show newly created material card on dashboard

### 5. CRUD Operations - Read (30 seconds)
- [ ] Show material cards with:
  - Title
  - Content preview
  - Tags
  - Generated content counts (flashcards, questions, study guide)
  - Timestamp/date
- [ ] Explain the information displayed

### 6. Study Room - Flashcards Mode (1 minute)
- [ ] Click "Study" button on a material card
- [ ] Show Study Room interface
- [ ] Switch to Flashcards mode (if not default)
- [ ] Demonstrate:
  - Clicking card to flip (question → answer)
  - Using Previous/Next buttons
  - Progress indicator (e.g., "1 / 5")
- [ ] Navigate through multiple flashcards

### 7. Study Room - Quiz Mode (1 minute)
- [ ] Switch to Quiz mode
- [ ] Show quiz question interface
- [ ] Answer 2-3 questions by selecting options
- [ ] Click "Submit Quiz"
- [ ] Show quiz results:
  - Score (e.g., "3 / 5")
  - Correct/incorrect indicators
  - Explanations for answers
- [ ] Show "Try Again" option

### 8. Study Room - Study Guide Mode (30 seconds)
- [ ] Switch to Study Guide mode
- [ ] Show formatted study guide
- [ ] Scroll through content
- [ ] Highlight organization and readability

### 9. CRUD Operations - Delete (30 seconds)
- [ ] Return to Dashboard
- [ ] Click "Delete" button on a material card
- [ ] Confirm deletion in the confirmation dialog
- [ ] Show success notification
- [ ] Verify material is removed from dashboard

### 10. Responsiveness Demonstration (30 seconds)
- [ ] Resize browser window (or use device emulator)
- [ ] Show mobile/tablet view:
  - Navigation menu adapts
  - Cards stack vertically
  - Forms remain usable
  - Study Room adapts to smaller screens

### 11. Error Handling Demonstration (30 seconds - optional)
- [ ] Show error scenarios (if applicable):
  - Network error handling
  - Invalid token handling (logout and try accessing protected route)
  - Form validation errors

### 12. Conclusion (30 seconds)
- [ ] Return to Dashboard
- [ ] Summarize key features:
  - AI-powered study material generation
  - Interactive flashcards and quizzes
  - Comprehensive study guides
  - User-friendly interface
- [ ] Show logout
- [ ] End on Home page

### Recommended Flow Order
1. Introduction → Login → Dashboard → Create Material → Study Room (all modes) → Delete → Responsiveness → Conclusion

### Tips for Recording
- Use screen recording software (OBS, Loom, Zoom, etc.)
- Speak clearly and explain each action
- Highlight loading states and animations
- Show both success and error states
- Keep transitions smooth
- Aim for 5-7 minutes total duration

## 📝 Notes

- The AI generation uses OpenAI's GPT-3.5-turbo model
- Rate limiting is implemented to prevent API abuse
- Test user is pre-seeded for easy demo access
- All AI calls are handled server-side for security

## 🤝 Contributing

This is a full-stack project template. Feel free to extend it with:
- User profiles and settings
- Material sharing between users
- Export functionality (PDF, JSON)
- Additional AI models (Claude, Gemini)
- Mobile app version

## 📄 License

ISC

## 👤 Author

Built as a complete MERN stack application template.

---

**Happy Studying! 📚✨**
