import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-16 md:pb-4">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;