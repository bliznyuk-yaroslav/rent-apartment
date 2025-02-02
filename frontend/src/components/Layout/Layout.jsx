import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../Header/Header";
export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
