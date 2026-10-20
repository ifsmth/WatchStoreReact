import { Outlet } from "react-router";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";

export default function AppLayout() {
  return (
    <div className="chrono-app-layout">
      <SiteHeader />
      <main id="main-content" className="chrono-main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
