import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Define pages that do not require authentication
    const excludedPages = ["/auth", "/home"];

    // Check if the user is authenticated
    const isLoggedIn = localStorage.getItem("login");

    // If login is not "true" and the user is not on an excluded page, redirect to the auth page
    if (isLoggedIn !== "true" && !excludedPages.includes(router.pathname)) {
      router.push("/auth"); // Redirect to your auth page
    }
  }, [router]);

  return <Component {...pageProps} />;
}
