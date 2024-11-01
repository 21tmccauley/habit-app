import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useHabits } from '@/hooks/use-habits';
import { useAuth } from '@/providers/auth-provider';

const HabitDebug = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { createHabit, getTodayHabits } = useHabits();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Test habit data
  const testHabit = {
    title: `Test Habit ${new Date().toLocaleTimeString()}`,
    description: 'This is a test habit',
    frequency: 'daily',
    reminder: false,
    goal: 'Test goal',
    startDate: new Date().toISOString().split('T')[0]
  };

  const createTestHabit = async () => {
    try {
      setLoading(true);
      const newHabit = await createHabit(testHabit);
      toast({
        title: "Test Habit Created",
        description: `Created habit with ID: ${newHabit.id}`,
      });
      loadHabits();
    } catch (error) {
      console.error('Error creating test habit:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadHabits = async () => {
    try {
      setLoading(true);
      const habitsList = await getTodayHabits();
      setHabits(habitsList);
      toast({
        title: "Habits Loaded",
        description: `Found ${habitsList.length} habits`,
      });
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Habit System Debug</CardTitle>
        </CardHeader>
        <CardContent>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Auth Status</h3>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify({ 
                  isAuthenticated: !!user,
                  userId: user?.uid,
                  email: user?.email, 
                 // isIndexBuilding: isIndexBuilding // Add this line
                }, null, 2)}
              </pre>
            </div>

            <div className="space-x-2">
              <Button 
                onClick={createTestHabit}
                disabled={loading}
              >
                Create Test Habit
              </Button>
              <Button 
                variant="outline"
                onClick={loadHabits}
                disabled={loading}
              >
                Refresh Habits
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Current Habits ({habits.length})</h3>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(habits, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitDebug;