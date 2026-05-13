import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className=" p-2 min-w-160 h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-480 h-full flex flex-col mx-auto">
        <Navbar className="shrink-0" />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
