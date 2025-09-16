import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface EditMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (meal: any) => void;
  meal: any;
}

export const EditMealDialog = ({ open, onOpenChange, onEdit, meal }: EditMealDialogProps) => {
  const [name, setName] = useState(meal.name);
  const [time, setTime] = useState(meal.time);
  const [foods, setFoods] = useState(meal.foods);

  // Update state when meal prop changes
  useEffect(() => {
    if (meal) {
      setName(meal.name);
      setTime(meal.time);
      setFoods(meal.foods);
    }
  }, [meal]);

  const handleSubmit = () => {
    const editedMeal = {
      ...meal,
      name,
      time,
      foods: foods.filter(food => food.name.trim() && food.quantity.trim())
    };
    
    onEdit(editedMeal);
    onOpenChange(false);
  };

  const addFood = () => {
    setFoods([...foods, { name: "", quantity: "" }]);
  };

  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const updateFood = (index: number, field: string, value: string) => {
    const updatedFoods = foods.map((food, i) => 
      i === index ? { ...food, [field]: value } : food
    );
    setFoods(updatedFoods);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Refeição</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da sua refeição
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Nome da refeição</Label>
            <Input
              id="meal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Café da manhã"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meal-time">Horário</Label>
            <Input
              id="meal-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Alimentos</Label>
            {foods.map((food, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Nome do alimento"
                  value={food.name}
                  onChange={(e) => updateFood(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Quantidade"
                  value={food.quantity}
                  onChange={(e) => updateFood(index, 'quantity', e.target.value)}
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFood(index)}
                  className="h-9 w-9 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addFood}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar alimento
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};