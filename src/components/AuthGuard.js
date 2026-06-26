"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(null);

  // After mount, check auth
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (pathname === "/") {
      if (isLoggedIn) {
        router.push("/menu");
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    } else {
      if (!isLoggedIn) {
        router.push("/");
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }
  }, [pathname, router]);

  // Server renders null, client renders null before mount → same tree
  if (authorized === null) return null;

  if (!authorized) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#FFE3EB",
        fontFamily: "sans-serif",
        color: "#590d22"
      }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  return children;
}
