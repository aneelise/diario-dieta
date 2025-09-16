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
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {meal.name}
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {meal.time}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {meal.foods.map((food, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-sm font-medium">{food.name}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {food.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="ghost" size="sm" className="gap-1">
            <Edit3 className="h-3 w-3" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};