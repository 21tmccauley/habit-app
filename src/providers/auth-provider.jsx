// src/providers/auth-provider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from '@/lib/firebase';

// Create context
const AuthContext = createContext(null);

// Custom hook for using auth
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    console.log('Setting up auth listener...'); // Debug log
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user'); // Debug log
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    console.log('Starting signup...'); // Debug log
    try {
      setLoading(true);
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully'); // Debug log

      // Update profile
      await updateProfile(userCredential.user, { displayName: name });
      console.log('Profile updated successfully'); // Debug log

      toast({
        title: "Account created",
        description: "Welcome to HabitTracker!",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error); // Debug log
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    console.log('Starting login...'); // Debug log
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful'); // Debug log
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error); // Debug log
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('Starting logout...'); // Debug log
    try {
      await signOut(auth);
      console.log('Logout successful'); // Debug log
      toast({
        title: "Logged out",
        description: "Come back soon!",
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error); // Debug log
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email) => {
    console.log('Starting password reset...'); // Debug log
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent'); // Debug log
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      console.error('Password reset error:', error); // Debug log
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Change these to named exports
export { AuthProvider, useAuth };

// Keep this as a component export
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
}