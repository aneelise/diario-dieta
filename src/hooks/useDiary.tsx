import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface DiaryEntry {
  id: string;
  date: string;
  hasCheatMeal: boolean;
  cheatMealDescription: string;
  goals: {
    water: number;
    waterGoal: number;
    workout: boolean;
    cardio: number;
    dietCompliance: boolean;
  };
  notes: string;
}

export const useDiary = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('diario')
        .select('*')
        .eq('usuario_id', user?.id)
        .order('data', { ascending: false });

      if (error) throw error;

      const formattedEntries: DiaryEntry[] = data.map(entry => ({
        id: entry.id,
        date: entry.data,
        hasCheatMeal: entry.refeicao_livre_ativa || false,
        cheatMealDescription: entry.refeicao_livre || '',
        goals: {
          water: (entry.agua_ml || 0) / 1000, // Convert ml to liters
          waterGoal: 3, // Default goal
          workout: entry.treino || false,
          cardio: entry.cardio_minutos || 0,
          dietCompliance: entry.seguir_dieta || false
        },
        notes: entry.notas || ''
      }));

      setEntries(formattedEntries);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      toast.error('Erro ao carregar entradas do diário');
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: Omit<DiaryEntry, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('diario')
        .insert({
          usuario_id: user?.id,
          data: entry.date,
          agua_ml: Math.round(entry.goals.water * 1000), // Convert liters to ml
          treino: entry.goals.workout,
          cardio_minutos: entry.goals.cardio,
          seguir_dieta: entry.goals.dietCompliance,
          notas: entry.notes,
          refeicao_livre_ativa: entry.hasCheatMeal,
          refeicao_livre: entry.hasCheatMeal ? entry.cheatMealDescription : null
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry: DiaryEntry = {
        id: data.id,
        date: data.data,
        hasCheatMeal: data.refeicao_livre_ativa || false,
        cheatMealDescription: data.refeicao_livre || '',
        goals: {
          water: (data.agua_ml || 0) / 1000,
          waterGoal: 3,
          workout: data.treino || false,
          cardio: data.cardio_minutos || 0,
          dietCompliance: data.seguir_dieta || false
        },
        notes: data.notas || ''
      };

      setEntries([newEntry, ...entries]);
      toast.success('Entrada do diário salva com sucesso!');
      return newEntry;
    } catch (error) {
      console.error('Error adding diary entry:', error);
      toast.error('Erro ao salvar entrada do diário');
      throw error;
    }
  };

  const updateEntry = async (updatedEntry: DiaryEntry) => {
    try {
      const { error } = await supabase
        .from('diario')
        .update({
          data: updatedEntry.date,
          agua_ml: Math.round(updatedEntry.goals.water * 1000),
          treino: updatedEntry.goals.workout,
          cardio_minutos: updatedEntry.goals.cardio,
          seguir_dieta: updatedEntry.goals.dietCompliance,
          notas: updatedEntry.notes,
          refeicao_livre_ativa: updatedEntry.hasCheatMeal,
          refeicao_livre: updatedEntry.hasCheatMeal ? updatedEntry.cheatMealDescription : null
        })
        .eq('id', updatedEntry.id);

      if (error) throw error;

      setEntries(entries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      ));
      toast.success('Entrada do diário atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating diary entry:', error);
      toast.error('Erro ao atualizar entrada do diário');
      throw error;
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('diario')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      setEntries(entries.filter(entry => entry.id !== entryId));
      toast.success('Entrada do diário excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      toast.error('Erro ao excluir entrada do diário');
      throw error;
    }
  };

  return {
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    refetch: fetchEntries
  };
};