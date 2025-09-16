import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Plus } from "lucide-react";
import { MealCard } from "@/components/MealCard";
import { EditMealDialog } from "@/components/EditMealDialog";
import { AddMealDialog } from "@/components/AddMealDialog";
import { useDiet, Meal } from "@/hooks/useDiet";

const Diet = () => {
  const { meals, loading, addMeal, updateMeal, deleteMeal } = useDiet();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

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

  const handleAddMeal = async (newMeal: Omit<Meal, 'id'>) => {
    await addMeal(newMeal);
    setIsAddDialogOpen(false);
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
          <Button 
            variant="ghost" 
            className="mt-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            Clique para adicionar
          </Button>
        </CardContent>
      </Card>

      <AddMealDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddMeal}
      />

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