import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit3, CheckCircle2, Clock, Droplets, Dumbbell } from "lucide-react";
import { DayCard } from "@/components/DayCard";
import { AddDayDialog } from "@/components/AddDayDialog";
import { EditDayDialog } from "@/components/EditDayDialog";

// Mock data for demonstration
const mockDays = [
  {
    id: "1",
    date: new Date().toISOString().split('T')[0],
    hasCheatMeal: true,
    cheatMealDescription: "Pizza margherita com amigos",
    goals: {
      water: 2.5,
      waterGoal: 3,
      workout: true,
      cardio: 30,
      dietCompliance: false
    },
    notes: "Dia difícil, mas consegui manter o foco na dieta."
  },
  {
    id: "2", 
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    hasCheatMeal: false,
    cheatMealDescription: "",
    goals: {
      water: 3,
      waterGoal: 3,
      workout: true,
      cardio: 45,
      dietCompliance: true
    },
    notes: "Excelente dia! Bateu todas as metas."
  }
];

const Diary = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<any>(null);
  const [days, setDays] = useState(mockDays);

  const handleEditDay = (day: any) => {
    setEditingDay(day);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (editedDay: any) => {
    setDays(days.map(day => day.id === editedDay.id ? editedDay : day));
  };

  const handleDeleteDay = (dayId: string) => {
    setDays(days.filter(day => day.id !== dayId));
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meu Diário</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso diário</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="gap-2 btn-primary-gradient text-primary-foreground hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Adicionar Dia
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <DayCard 
            key={day.id} 
            day={day} 
            onEdit={handleEditDay}
            onDelete={handleDeleteDay}
          />
        ))}
      </div>

      <AddDayDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAdd={(newDay) => {
          setDays([newDay, ...days]);
          setIsAddDialogOpen(false);
        }}
      />

      {editingDay && (
        <EditDayDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onEdit={handleSaveEdit}
          day={editingDay}
        />
      )}
    </div>
  );
};

export default Diary;