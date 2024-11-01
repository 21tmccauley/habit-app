import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Habit from './Habit';
import { useHabits } from '@/hooks/use-habits';

const HabitContainer = ({ 
  habit, 
  onUpdate,
  isCompleted,
  showStats = true 
}) => {
  const { toast } = useToast();
  const { toggleHabitCompletion, deleteHabit } = useHabits();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      await toggleHabitCompletion(habit.id);
      onUpdate?.();
      toast({
        title: isCompleted ? "Habit Uncompleted" : "Habit Completed",
        description: isCompleted 
          ? "Progress has been updated" 
          : "Keep up the good work!",
      });
    } catch (error) {
      console.error('Error toggling habit:', error);
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteHabit(habit.id);
      onUpdate?.();
      toast({
        title: "Habit Deleted",
        description: "The habit has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
    // TODO: Implement edit functionality
  };

  return (
    <>
      <Habit
        habit={habit}
        isCompleted={isCompleted}
        disabled={isLoading}
        showStats={showStats}
        onComplete={handleComplete}
        onDelete={() => setIsDeleteDialogOpen(true)}
        onEdit={handleEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Habit</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{habit.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          {/* TODO: Add EditHabitForm component */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HabitContainer;