import { NavLink } from "react-router-dom";
import { BookOpen, UtensilsCrossed, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    to: "/", 
    icon: BookOpen, 
    label: "Diário" 
  },
  { 
    to: "/dieta", 
    icon: UtensilsCrossed, 
    label: "Minha Dieta" 
  },
  { 
    to: "/relatorios", 
    icon: BarChart3, 
    label: "Relatórios" 
  },
];

export const TopNavigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            <div className="text-2xl font-bold text-gradient">Diário Alimentar</div>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("h-4 w-4", isActive && "text-primary-foreground")} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};