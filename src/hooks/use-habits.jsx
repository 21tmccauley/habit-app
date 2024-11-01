// src/hooks/use-habits.jsx
import { useState, useCallback } from 'react';
import { 
  db,
  collection, 
  addDoc, 
  getDocs,
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from '@/lib/firebase';
import { useAuth } from '@/providers/auth-provider';

export const useHabits = () => {
  const { user } = useAuth();
  const [isIndexBuilding, setIsIndexBuilding] = useState(false);

  const createHabit = async (habitData) => {
    if (!user) throw new Error('Must be logged in to create habits');

    const newHabit = {
      ...habitData,
      userId: user.uid,
      createdAt: serverTimestamp(),
      status: 'active',
      completedDates: [],
      currentStreak: 0,
      bestStreak: 0,
    };

    const docRef = await addDoc(collection(db, 'habits'), newHabit);
    return { id: docRef.id, ...newHabit };
  };

  const getTodayHabits = useCallback(async () => {
    if (!user) return [];

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // First try with the full query
      const habitsQuery = query(
        collection(db, 'habits'),
        where('userId', '==', user.uid),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(habitsQuery);
      return snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }))
        .filter(habit => {
          const startDate = new Date(habit.startDate);
          return startDate <= today;
        });

    } catch (error) {
      // If we get an index error, fall back to a simpler query
      if (error.code === 'failed-precondition' || error.code === 'resource-exhausted') {
        setIsIndexBuilding(true);
        console.log('Index not ready, falling back to simple query');
        
        // Simpler query that doesn't require the composite index
        const simpleQuery = query(
          collection(db, 'habits'),
          where('userId', '==', user.uid)
        );

        const snapshot = await getDocs(simpleQuery);
        return snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          }))
          .filter(habit => {
            const startDate = new Date(habit.startDate);
            const isActive = habit.status === 'active';
            return startDate <= today && isActive;
          })
          .sort((a, b) => b.createdAt - a.createdAt);
      }
      throw error;
    }
  }, [user]);

  return {
    createHabit,
    getTodayHabits,
    isIndexBuilding
  };
};