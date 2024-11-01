import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './providers/theme-provider';
import { ToastProvider } from './providers/toast-provider';
import  { AuthProvider} from './providers/auth-provider'
import ErrorBoundary from './components/ui/error-boundary';
import Layout from './components/layout/Layout';

// Import page components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
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
          <ToastProvider />
        </ThemeProvider>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;