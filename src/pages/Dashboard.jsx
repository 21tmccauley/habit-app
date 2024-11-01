// src/pages/Dashboard.jsx
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Dashboard = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Welcome to Habit Tracker!",
      description: "This is where you'll see your habit tracking progress.",
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Start tracking your first habit today!</p>
            <Button onClick={showToast}>Create Habit</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No habits scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Start tracking to see your progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;