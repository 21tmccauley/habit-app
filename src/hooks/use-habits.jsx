import { useState, useCallback } from 'react';
import { 
  db, 
  collection, 
  addDoc, 
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
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
          createdAt: doc.data().createdAt?.toDate(),
          completedDates: doc.data().completedDates || []
        }))
        .filter(habit => {
          const startDate = new Date(habit.startDate);
          return startDate <= today;
        });
    } catch (error) {
      if (error.code === 'failed-precondition' || error.code === 'resource-exhausted') {
        setIsIndexBuilding(true);
        const simpleQuery = query(
          collection(db, 'habits'),
          where('userId', '==', user.uid)
        );

        const snapshot = await getDocs(simpleQuery);
        return snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            completedDates: doc.data().completedDates || []
          }))
          .filter(habit => {
            const startDate = new Date(habit.startDate);
            const isActive = habit.status === 'active';
            return startDate <= new Date() && isActive;
          })
          .sort((a, b) => b.createdAt - a.createdAt);
      }
      throw error;
    }
  }, [user]);

  // In useHabits.jsx, update the toggleHabitCompletion function:
  const toggleHabitCompletion = async (habitId) => {
    if (!user) throw new Error('Must be logged in to update habits');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();
    
    const habitRef = doc(db, 'habits', habitId);
    const habitDoc = await getDoc(habitRef);
    
    if (!habitDoc.exists()) {
      throw new Error('Habit not found');
    }

    const habit = habitDoc.data();
    const completedDates = habit.completedDates || [];
    
    const isCompleted = completedDates.includes(todayStr);
    
    if (isCompleted) {
      await updateDoc(habitRef, {
        completedDates: completedDates.filter(date => date !== todayStr)
      });
    } else {
      await updateDoc(habitRef, {
        completedDates: [...completedDates, todayStr]
      });
    }

    return !isCompleted;
  };

  const deleteHabit = async (habitId) => {
    if (!user) throw new Error('Must be logged in to delete habits');
    await deleteDoc(doc(db, 'habits', habitId));
  };

  // Add this function that was missing
  const getCompletedHabits = useCallback(async () => {
    if (!user) return [];
    
    const habits = await getTodayHabits();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();
    
    return habits
      .filter(habit => habit.completedDates?.includes(todayStr))
      .map(habit => habit.id);
  }, [user, getTodayHabits]);

  return {
    createHabit,
    getTodayHabits,
    toggleHabitCompletion,
    deleteHabit,
    getCompletedHabits,  // Make sure to export it
    isIndexBuilding,
  };
};