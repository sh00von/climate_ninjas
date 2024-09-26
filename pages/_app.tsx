import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isLoggedIn = localStorage.getItem("login");

    // If login is not "true" and the user is not on the auth page, redirect to the auth page
    if (isLoggedIn !== "true" && router.pathname !== "/auth") {
      router.push("/auth"); // Redirect to your auth page
    }
  }, [router]);

  return <Component {...pageProps} />;
}
