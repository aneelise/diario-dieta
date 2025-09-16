import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Droplets, Dumbbell, UtensilsCrossed, Edit3, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface DayCardProps {
  day: {
    id: string;
    date: string;
    hasCheatMeal: boolean;
    cheatMealDescription?: string;
    goals: {
      water: number;
      waterGoal: number;
      workout: boolean;
      cardio: number;
      dietCompliance: boolean;
    };
    notes?: string;
  };
  onEdit?: (day: DayCardProps['day']) => void;
  onDelete?: (dayId: string) => void;
}

export const DayCard = ({ day, onEdit, onDelete }: DayCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = () => {
    if (onEdit) {
      onEdit(day);
    }
  };

  return (
    <Card className={cn(
      "card-modern transition-all duration-300",
      day.hasCheatMeal && "border-cheat-meal/30 bg-gradient-to-br from-cheat-meal/5 to-cheat-meal/10",
      isToday && "ring-2 ring-primary/30 shadow-[var(--shadow-glow)]"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {formatDate(day.date)}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isToday && <Badge variant="default" className="text-xs btn-primary-gradient">Hoje</Badge>}
            {day.hasCheatMeal && (
              <Badge variant="outline" className="text-xs text-cheat-meal border-cheat-meal/50 bg-cheat-meal/10">
                {day.cheatMealDescription || "Refeição Livre"}
              </Badge>
            )}
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
              "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
              day.goals.workout 
                ? "bg-success/90 shadow-md border-2 border-success" 
                : "bg-error/10 border-2 border-error/30"
            )}>
              {day.goals.workout ? (
                <CheckCircle2 className="h-3 w-3 text-success-foreground" />
              ) : (
                <X className="h-3 w-3 text-error" />
              )}
            </div>
            <span className="text-sm font-medium">Treino</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
              day.goals.dietCompliance 
                ? "bg-success/90 shadow-md border-2 border-success" 
                : "bg-error/10 border-2 border-error/30"
            )}>
              {day.goals.dietCompliance ? (
                <CheckCircle2 className="h-3 w-3 text-success-foreground" />
              ) : (
                <X className="h-3 w-3 text-error" />
              )}
            </div>
            <span className="text-sm font-medium">Dieta 100%</span>
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

        <div className="flex justify-end gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 hover:bg-primary/10 hover:text-primary"
            onClick={handleEdit}
          >
            <Edit3 className="h-3 w-3" />
            Editar
          </Button>
          
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                  Excluir
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir dia</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(day.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};