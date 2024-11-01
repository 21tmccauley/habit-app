import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider';
import Layout from './components/layout/Layout'


const Dashboard = () => (
  <div className="space-y-4">
    <h1 className="text-4xl font-bold">Dashboard</h1>
    <p>your habits overview will appear here</p>
  </div>
)

const Login = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Login</h1>
    <p>Login form will go here</p>
  </div>
);

const SignUp = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Sign Up</h1>
    <p>Sign up form will go here</p>
  </div>
);

const Settings = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Settings</h1>
    <p>User settings will go here</p>
  </div>
);

const Statistics = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Statistics</h1>
    <p>Your habit statistics will appear here</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App