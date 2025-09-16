import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Plus } from "lucide-react";
import { MealCard } from "@/components/MealCard";
import { EditMealDialog } from "@/components/EditMealDialog";

// Mock data for demonstration
const mockMeals = [
  {
    id: "1",
    name: "Pré-treino",
    time: "06:00",
    foods: [
      { name: "Banana", quantity: "1 unidade" },
      { name: "Aveia", quantity: "30g" },
      { name: "Whey Protein", quantity: "1 scoop" }
    ]
  },
  {
    id: "2",
    name: "Café da manhã",
    time: "08:00", 
    foods: [
      { name: "Ovos mexidos", quantity: "2 unidades" },
      { name: "Pão integral", quantity: "2 fatias" },
      { name: "Abacate", quantity: "1/2 unidade" }
    ]
  },
  {
    id: "3",
    name: "Almoço",
    time: "12:30",
    foods: [
      { name: "Peito de frango grelhado", quantity: "150g" },
      { name: "Arroz integral", quantity: "100g" },
      { name: "Brócolis refogado", quantity: "100g" },
      { name: "Salada verde", quantity: "À vontade" }
    ]
  },
  {
    id: "4",
    name: "Lanche da tarde",
    time: "15:30",
    foods: [
      { name: "Iogurte grego", quantity: "150g" },
      { name: "Castanha do Brasil", quantity: "3 unidades" },
      { name: "Fruta da época", quantity: "1 porção" }
    ]
  },
  {
    id: "5", 
    name: "Jantar",
    time: "19:00",
    foods: [
      { name: "Salmão grelhado", quantity: "120g" },
      { name: "Batata doce", quantity: "100g" },
      { name: "Aspargos", quantity: "100g" }
    ]
  }
];

const Diet = () => {
  const [meals, setMeals] = useState(mockMeals);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<any>(null);

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (editedMeal: Meal) => {
    await updateMeal(editedMeal);
    setIsEditDialogOpen(false);
  };

  const handleDeleteMeal = async (mealId: string) => {
    await deleteMeal(mealId);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minha Dieta</h1>
          <p className="text-muted-foreground">Seu plano alimentar personalizado</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit3 className="h-4 w-4" />
          Editar Dieta
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Carregando refeições...
          </div>
        ) : meals.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Nenhuma refeição encontrada. Crie seu primeiro plano alimentar!
          </div>
        ) : (
          meals.map((meal) => (
            <MealCard 
              key={meal.id} 
              meal={meal} 
              onEdit={handleEditMeal}
              onDelete={handleDeleteMeal}
            />
          ))
        )}
      </div>

      <Card className="border-dashed border-2 border-muted-foreground/30 bg-muted/30">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-center">
            Adicionar nova refeição
          </p>
          <Button variant="ghost" className="mt-2">
            Clique para adicionar
          </Button>
        </CardContent>
      </Card>

      {editingMeal && (
        <EditMealDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onEdit={handleSaveEdit}
          meal={editingMeal}
        />
      )}
    </div>
  );
};

export default Diet;