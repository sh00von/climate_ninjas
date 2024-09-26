import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress"; // Import nprogress
import "nprogress/nprogress.css"; // Import default NProgress styles

export default function App({ Component, pageProps, router }: AppProps) {
  const currentPath = router.pathname;

  const routerNext = useRouter(); // For router event listeners

  useEffect(() => {
    // Start the progress bar when a route change starts
    const handleStart = () => NProgress.start();
    
    // Stop the progress bar when a route change completes or errors
    const handleStop = () => NProgress.done();

    routerNext.events.on("routeChangeStart", handleStart);
    routerNext.events.on("routeChangeComplete", handleStop);
    routerNext.events.on("routeChangeError", handleStop);

    return () => {
      routerNext.events.off("routeChangeStart", handleStart);
      routerNext.events.off("routeChangeComplete", handleStop);
      routerNext.events.off("routeChangeError", handleStop);
    };
  }, [routerNext]);

  useEffect(() => {
    // Define pages that do not require authentication
    const excludedPages = ["/auth", "/"];

    // Check if the user is authenticated
    const isLoggedIn = localStorage.getItem("login");

    // If login is not "true" and the user is not on an excluded page, redirect to the auth page
    if (isLoggedIn !== "true" && !excludedPages.includes(router.pathname)) {
      router.push("/auth"); // Redirect to your auth page
    }
  }, [router]);

  return (
    <div className="app-container"> {/* Wrapper to avoid black screen */}
      <Component {...pageProps} key={currentPath} />
    </div>
  );
}
