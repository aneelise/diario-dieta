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

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:relative md:border-none md:bg-transparent md:flex md:justify-center md:py-4">
      <div className="flex md:bg-card md:rounded-full md:px-6 md:py-2 md:border md:shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-3 md:flex-row md:gap-2 transition-colors",
                "hover:text-primary",
                isActive
                  ? "text-primary bg-primary/10 md:bg-primary/20 md:rounded-full"
                  : "text-muted-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};