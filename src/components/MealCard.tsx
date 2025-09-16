import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Edit3, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    time: string;
    foods: Array<{
      name: string;
      quantity: string;
    }>;
  };
  onEdit?: (meal: MealCardProps['meal']) => void;
  onDelete?: (mealId: string) => void;
}

export const MealCard = ({ meal, onEdit, onDelete }: MealCardProps) => {
  return (
    <Card className="h-fit card-modern">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {meal.name}
          </CardTitle>
          <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20">
            <Clock className="h-3 w-3" />
            {meal.time}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {meal.foods.map((food, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-1 rounded-lg hover:bg-muted/30 transition-colors">
              <span className="text-sm font-medium">{food.name}</span>
              <span className="text-xs text-muted-foreground bg-muted/80 px-2 py-1 rounded-full">
                {food.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/50">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 hover:bg-primary/10 hover:text-primary"
            onClick={() => onEdit?.(meal)}
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
                  <AlertDialogTitle>Excluir refeição</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir esta refeição? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(meal.id)}
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