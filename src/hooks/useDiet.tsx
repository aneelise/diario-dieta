import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Food {
  name: string;
  quantity: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
}

export const useDiet = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMeals();
    }
  }, [user]);

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from('dieta')
        .select('*')
        .eq('usuario_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMeals: Meal[] = data.map(meal => ({
        id: meal.id,
        name: meal.refeicao || '',
        time: meal.hora || '08:00',
        foods: meal.alimentos || []
      }));

      setMeals(formattedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
      toast.error('Erro ao carregar refeições');
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (meal: Omit<Meal, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('dieta')
        .insert({
          usuario_id: user?.id,
          refeicao: meal.name,
          hora: meal.time,
          alimentos: meal.foods
        })
        .select()
        .single();

      if (error) throw error;

      const newMeal: Meal = {
        id: data.id,
        name: data.refeicao || '',
        time: data.hora || '08:00',
        foods: data.alimentos || []
      };

      setMeals([...meals, newMeal]);
      toast.success('Refeição adicionada com sucesso!');
      return newMeal;
    } catch (error) {
      console.error('Error adding meal:', error);
      toast.error('Erro ao adicionar refeição');
      throw error;
    }
  };

  const updateMeal = async (updatedMeal: Meal) => {
    try {
      const { error } = await supabase
        .from('dieta')
        .update({
          refeicao: updatedMeal.name,
          hora: updatedMeal.time,
          alimentos: updatedMeal.foods
        })
        .eq('id', updatedMeal.id);

      if (error) throw error;

      setMeals(meals.map(meal => 
        meal.id === updatedMeal.id ? updatedMeal : meal
      ));
      toast.success('Refeição atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating meal:', error);
      toast.error('Erro ao atualizar refeição');
      throw error;
    }
  };

  const deleteMeal = async (mealId: string) => {
    try {
      const { error } = await supabase
        .from('dieta')
        .delete()
        .eq('id', mealId);

      if (error) throw error;

      setMeals(meals.filter(meal => meal.id !== mealId));
      toast.success('Refeição excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast.error('Erro ao excluir refeição');
      throw error;
    }
  };

  return {
    meals,
    loading,
    addMeal,
    updateMeal,
    deleteMeal,
    refetch: fetchMeals
  };
};