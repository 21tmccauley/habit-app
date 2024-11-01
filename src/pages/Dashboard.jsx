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
import { Plus, CheckCircle2 } from 'lucide-react';
import CreateHabitForm from '@/components/habits/CreateHabitForm';
import { useHabits } from '@/hooks/use-habits';

const Dashboard = () => {
  const { toast } = useToast();
  const { getTodayHabits } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayHabits, setTodayHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHabits = async () => {
    try {
      const habits = await getTodayHabits();
      setTodayHabits(habits);
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
        {todayHabits.length === 0 && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Start tracking your first habit today!</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create Habit</Button>
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
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Habits</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading habits...</p>
            ) : todayHabits.length === 0 ? (
              <p className="text-muted-foreground">No habits scheduled for today</p>
            ) : (
              <ul className="space-y-2">
                {todayHabits.map(habit => (
                  <li key={habit.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                    <span>{habit.title}</span>
                    <Button variant="ghost" size="sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {todayHabits.length === 0 
                ? "Start tracking to see your progress"
                : "Progress tracking coming soon"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;