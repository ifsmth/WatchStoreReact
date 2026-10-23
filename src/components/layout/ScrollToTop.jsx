import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop component scrolls window and scrollable viewports to top
 * whenever the route (pathname or search params) changes.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // 1. Reset window and document scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    if (document.body) {
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    // 2. Also reset any internal scrollable main containers (e.g. admin content area)
    const adminContent = document.querySelector(".admin-content");
    if (adminContent) {
      adminContent.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    const mainContent = document.querySelector(".chrono-main");
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname, search]);

  return null;
}
