import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import CreateHabitForm from '@/components/habits/CreateHabitForm';
import HabitContainer from '@/components/habits/HabitContainer';
import { useHabits } from '@/hooks/use-habits';

const Dashboard = () => {
  const { toast } = useToast();
  const { getTodayHabits, getCompletedHabits } = useHabits();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHabits = async () => {
    try {
      setIsLoading(true);
      const [habitsList, completed] = await Promise.all([
        getTodayHabits(),
        getCompletedHabits()
      ]);
      setHabits(habitsList);
      setCompletedHabits(completed);
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: "Failed to load habits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const onHabitCreated = () => {
    setIsModalOpen(false);
    loadHabits();
    toast({
      title: "Habit Created",
      description: "Your new habit has been added to your dashboard.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
            </DialogHeader>
            <CreateHabitForm
              onSuccess={onHabitCreated}
              onCancel={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Loading skeletons
          [...Array(3)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full animate-pulse" />
                  <div className="h-3 bg-muted rounded w-4/5 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : habits.length === 0 ? (
          // Empty state
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>No Habits Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Start by creating your first habit using the button above.
              </p>
            </CardContent>
          </Card>
        ) : (
          // Habit list
          habits.map(habit => (
            <HabitContainer
              key={habit.id}
              habit={habit}
              isCompleted={completedHabits.includes(habit.id)}
              onUpdate={loadHabits}
            />
          ))
        )}
      </div>

      {habits.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {completedHabits.length} / {habits.length}
              </p>
              <p className="text-sm text-muted-foreground">
                habits completed today
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;