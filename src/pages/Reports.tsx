import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Droplets, Dumbbell, UtensilsCrossed, Clock } from "lucide-react";

const Reports = () => {
  // Mock data for demonstration
  const weeklyStats = {
    adherence: 85,
    workouts: 5,
    totalWorkouts: 6,
    cardioMinutes: 180,
    waterGoalDays: 6,
    cheatMeals: 2
  };

  const achievements = [
    { title: "Guerreiro da Água", description: "Bebeu 3L por 7 dias seguidos", completed: true },
    { title: "Foco Total", description: "100% de adesão à dieta por 5 dias", completed: false },
    { title: "Cardio Master", description: "200 min de cardio na semana", completed: true }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-8 text-muted-foreground">
          Carregando relatórios...
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-8 text-muted-foreground">
          Nenhum dado disponível. Adicione entradas no diário para ver os relatórios!
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground">Acompanhe sua evolução e conquistas</p>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Resumo Semanal
          </CardTitle>
          <CardDescription>
            Sua performance nos últimos 7 dias
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{weeklyStats.adherence}%</div>
              <p className="text-sm text-muted-foreground">Adesão à Dieta</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{weeklyStats.workouts}/{weeklyStats.totalWorkouts}</div>
              <p className="text-sm text-muted-foreground">Treinos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{weeklyStats.cardioMinutes}min</div>
              <p className="text-sm text-muted-foreground">Cardio Total</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{weeklyStats.waterGoalDays}/7</div>
              <p className="text-sm text-muted-foreground">Meta Água</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progresso Geral</span>
              <span>{weeklyStats.adherence}%</span>
            </div>
            <Progress value={weeklyStats.adherence} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Metas da Semana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Meta de Água</span>
              </div>
              <Badge variant={weeklyStats.waterGoalDays >= 5 ? "default" : "secondary"}>
                {weeklyStats.waterGoalDays}/7 dias
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-primary" />
                <span className="text-sm">Treinos</span>
              </div>
              <Badge variant={weeklyStats.workouts >= 4 ? "default" : "secondary"}>
                {weeklyStats.workouts}/{weeklyStats.totalWorkouts}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm">Cardio Semanal</span>
              </div>
              <Badge variant={weeklyStats.cardioMinutes >= 150 ? "default" : "secondary"}>
                {weeklyStats.cardioMinutes} min
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-destructive" />
                <span className="text-sm">Refeições Livres</span>
              </div>
              <Badge variant="outline">
                {weeklyStats.cheatMeals} esta semana
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${achievement.completed ? 'bg-success' : 'bg-muted-foreground'}`} />
                <div className="flex-1">
                  <h4 className={`font-medium text-sm ${achievement.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;