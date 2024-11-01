import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Bell, Target } from 'lucide-react';
import { useHabits } from '@/hooks/use-habits';

const CreateHabitForm = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const { createHabit } = useHabits();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: 'daily',
    reminder: false,
    goal: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Habit title is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createHabit(formData);
      toast({
        title: "Success",
        description: "Habit created successfully!",
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error creating habit:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Habit Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter habit title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          name="description"
          placeholder="Add a description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <select
          id="frequency"
          name="frequency"
          className="w-full p-2 border rounded-md"
          value={formData.frequency}
          onChange={handleInputChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4" />
          <Label htmlFor="reminder">Enable Reminders</Label>
        </div>
        <Switch
          id="reminder"
          checked={formData.reminder}
          onCheckedChange={() => handleSwitchChange('reminder')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">Goal (Optional)</Label>
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <Input
            id="goal"
            name="goal"
            placeholder="Set a goal"
            value={formData.goal}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Habit'}
        </Button>
      </div>
    </form>
  );
};

export default CreateHabitForm;