// src/pages/Statistics.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Statistics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Statistics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0%</p>
            <p className="text-sm text-muted-foreground">Start tracking to see your completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0 days</p>
            <p className="text-sm text-muted-foreground">Your longest streak will appear here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Create your first habit to get started</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track your habits to see weekly statistics</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Statistics