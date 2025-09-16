import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit3, CheckCircle2, Clock, Droplets, Dumbbell } from "lucide-react";
import { DayCard } from "@/components/DayCard";
import { AddDayDialog } from "@/components/AddDayDialog";
import { EditDayDialog } from "@/components/EditDayDialog";
import { useDiary, DiaryEntry } from "@/hooks/useDiary";

const Diary = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<DiaryEntry | null>(null);
  const { entries: days, loading, addEntry, updateEntry, deleteEntry } = useDiary();

  const handleEditDay = (day: DiaryEntry) => {
    setEditingDay(day);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (editedDay: DiaryEntry) => {
    await updateEntry(editedDay);
    setIsEditDialogOpen(false);
  };

  const handleDeleteDay = async (dayId: string) => {
    await deleteEntry(dayId);
  };

  const handleAddDay = async (newDay: Omit<DiaryEntry, 'id'>) => {
    await addEntry(newDay);
    setIsAddDialogOpen(false);
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
        {loading ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Carregando dados do diário...
          </div>
        ) : days.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Nenhuma entrada encontrada. Adicione sua primeira entrada!
          </div>
        ) : (
          days.map((day) => (
            <DayCard 
              key={day.id} 
              day={day} 
              onEdit={handleEditDay}
              onDelete={handleDeleteDay}
            />
          ))
        )}
      </div>

      <AddDayDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddDay}
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