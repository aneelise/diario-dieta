import { Outlet } from "react-router-dom";
import { TopNavigation } from "./TopNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;