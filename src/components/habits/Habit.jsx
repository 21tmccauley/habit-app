import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Target,
  MoreVertical,
  Trash2,
  Edit,
  TrendingUp,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const Habit = ({
  habit,
  onComplete,
  onDelete,
  onEdit,
  isCompleted,
  disabled = false,
  showStats = true
}) => {
  const {
    id,
    title,
    description,
    frequency,
    goal,
    startDate,
    completedDates = [],
    currentStreak = 0,
  } = habit;

  const completionRate = completedDates.length > 0
    ? Math.round((completedDates.length / ((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24))) * 100)
    : 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium leading-none">{title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {frequency}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onComplete(habit)}
              disabled={disabled}
              className={isCompleted ? 'text-green-500 hover:text-green-600' : ''}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(habit)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(habit)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      {(description || goal) && (
        <CardContent className="pb-3">
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {goal && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              <Target className="h-3 w-3" />
              <span className="text-muted-foreground">{goal}</span>
            </div>
          )}
        </CardContent>
      )}

      {showStats && (
        <CardFooter className="border-t pt-3">
          <div className="w-full grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-muted-foreground">Started</p>
              <p className="font-medium">
                {format(new Date(startDate), 'MMM d')}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Streak</p>
              <p className="font-medium flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3 text-orange-500" />
                {currentStreak} days
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Completion</p>
              <p className="font-medium">{completionRate}%</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default Habit;