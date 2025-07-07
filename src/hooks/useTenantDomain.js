import { useState, useEffect } from "react";

export function getTenantDomain(hostname) {
  if (!hostname) return "";

  // যদি hostname localhost থাকে (বা dev environment)
  if (hostname.includes("localhost")) {
    // যেমন: fashions.com.localhost → 'fashions.com'
    const parts = hostname.split(".");
    return parts.slice(0, parts.length - 1).join(".");
  }

  const parts = hostname.split(".");

  if (parts.length > 2) {
    // সাবডোমেইন আছে
    return parts[0];
  }

  // কাস্টম ডোমেইন
  return hostname;
}

export function useTenantDomain() {
  const [tenantDomain, setTenantDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      setTenantDomain(getTenantDomain(hostname));
    }
  }, []);

  return tenantDomain;
}
