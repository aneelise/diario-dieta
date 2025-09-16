import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Edit3 } from "lucide-react";

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
}

export const MealCard = ({ meal }: MealCardProps) => {
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

        <div className="flex justify-end pt-2 border-t border-border/50">
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary/10 hover:text-primary">
            <Edit3 className="h-3 w-3" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};