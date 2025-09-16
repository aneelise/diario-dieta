import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EditDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (day: any) => void;
  day: any;
}

export const EditDayDialog = ({ open, onOpenChange, onEdit, day }: EditDayDialogProps) => {
  const [date, setDate] = useState<Date>(new Date(day.date));
  const [hasCheatMeal, setHasCheatMeal] = useState(day.hasCheatMeal);
  const [cheatMealDescription, setCheatMealDescription] = useState(day.cheatMealDescription || "");
  const [water, setWater] = useState(day.goals.water);
  const [workout, setWorkout] = useState(day.goals.workout);
  const [cardio, setCardio] = useState(day.goals.cardio);
  const [dietCompliance, setDietCompliance] = useState(day.goals.dietCompliance);
  const [notes, setNotes] = useState(day.notes || "");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = () => {
    // Use toISOString().split("T")[0] to get the exact date without timezone conversion
    const localDateString = date.toISOString().split("T")[0];
    
    const editedDay = {
      ...day,
      date: localDateString,
      hasCheatMeal,
      cheatMealDescription: hasCheatMeal ? cheatMealDescription : "",
      goals: {
        water,
        waterGoal: day.goals.waterGoal,
        workout,
        cardio,
        dietCompliance
      },
      notes
    };
    
    onEdit(editedDay);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Dia</DialogTitle>
          <DialogDescription>
            Atualize suas informações do dia
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Data</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    if (newDate) setDate(newDate);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="cheat-meal"
                checked={hasCheatMeal}
                onCheckedChange={(checked) => setHasCheatMeal(checked as boolean)}
              />
              <Label htmlFor="cheat-meal">Teve refeição livre hoje</Label>
            </div>
            
            {hasCheatMeal && (
              <Input
                placeholder="Qual foi a refeição livre?"
                value={cheatMealDescription}
                onChange={(e) => setCheatMealDescription(e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="water">Água consumida (litros)</Label>
            <Input
              id="water"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="workout"
                checked={workout}
                onCheckedChange={(checked) => setWorkout(checked as boolean)}
              />
              <Label htmlFor="workout">Fez treino hoje</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="diet"
                checked={dietCompliance}
                onCheckedChange={(checked) => setDietCompliance(checked as boolean)}
              />
              <Label htmlFor="diet">Seguiu a dieta 100%</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardio">Cardio (minutos)</Label>
            <Input
              id="cardio"
              type="number"
              min="0"
              max="300"
              value={cardio}
              onChange={(e) => setCardio(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas do dia</Label>
            <Textarea
              id="notes"
              placeholder="Como foi seu dia? Sensações, dificuldades..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
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