import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Droplets, Dumbbell, UtensilsCrossed, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DayCardProps {
  day: {
    id: string;
    date: string;
    hasCheatMeal: boolean;
    goals: {
      water: number;
      waterGoal: number;
      workout: boolean;
      cardio: number;
      dietCompliance: boolean;
    };
    notes?: string;
  };
}

export const DayCard = ({ day }: DayCardProps) => {
  const waterProgress = (day.goals.water / day.goals.waterGoal) * 100;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const isToday = day.date === new Date().toISOString().split('T')[0];

  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      day.hasCheatMeal && "border-warning/50 bg-warning/5",
      isToday && "ring-2 ring-primary/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {formatDate(day.date)}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isToday && <Badge variant="default" className="text-xs">Hoje</Badge>}
            {day.hasCheatMeal && <Badge variant="outline" className="text-xs text-warning border-warning">Refeição Livre</Badge>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Goals Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>Água</span>
            </div>
            <span className="text-sm font-medium">
              {day.goals.water}L / {day.goals.waterGoal}L
            </span>
          </div>
          <Progress value={waterProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center",
              day.goals.workout ? "bg-success" : "bg-muted"
            )}>
              {day.goals.workout && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}
            </div>
            <span className="text-sm">Treino</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center",
              day.goals.dietCompliance ? "bg-success" : "bg-muted"
            )}>
              {day.goals.dietCompliance && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}
            </div>
            <span className="text-sm">Dieta 100%</span>
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm">Cardio: {day.goals.cardio}min</span>
          </div>
        </div>

        {day.notes && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground italic">
              "{day.notes}"
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <Edit3 className="h-3 w-3" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};