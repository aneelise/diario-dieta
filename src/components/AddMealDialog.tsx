import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Meal, Food } from "@/hooks/useDiet";

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (meal: Omit<Meal, 'id'>) => void;
}

export const AddMealDialog = ({ open, onOpenChange, onAdd }: AddMealDialogProps) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("08:00");
  const [foods, setFoods] = useState<Food[]>([{ name: "", quantity: "" }]);

  const handleAddFood = () => {
    setFoods([...foods, { name: "", quantity: "" }]);
  };

  const handleRemoveFood = (index: number) => {
    if (foods.length > 1) {
      setFoods(foods.filter((_, i) => i !== index));
    }
  };

  const handleFoodChange = (index: number, field: keyof Food, value: string) => {
    const updatedFoods = foods.map((food, i) => 
      i === index ? { ...food, [field]: value } : food
    );
    setFoods(updatedFoods);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    const validFoods = foods.filter(food => food.name.trim() !== "");
    
    const newMeal: Omit<Meal, 'id'> = {
      name: name.trim(),
      time,
      foods: validFoods
    };

    onAdd(newMeal);
    
    // Reset form
    setName("");
    setTime("08:00");
    setFoods([{ name: "", quantity: "" }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Refeição</DialogTitle>
          <DialogDescription>
            Crie uma nova refeição para seu plano alimentar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Nome da Refeição</Label>
            <Input
              id="meal-name"
              placeholder="Ex: Café da manhã, Almoço, Jantar..."
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <div className="flex items-center justify-between">
              <Label>Alimentos</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFood}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>

            {foods.map((food, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Nome do alimento"
                  value={food.name}
                  onChange={(e) => handleFoodChange(index, "name", e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Quantidade"
                  value={food.quantity}
                  onChange={(e) => handleFoodChange(index, "quantity", e.target.value)}
                  className="w-32"
                />
                {foods.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveFood(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Adicionar Refeição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};