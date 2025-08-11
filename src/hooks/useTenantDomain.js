export function getTenantDomain(hostname) {
  if (!hostname) return "";

  // Handle localhost (including ports)
  if (hostname.includes("localhost")) {
    // Remove port if present
    const hostWithoutPort = hostname.split(":")[0];
    const parts = hostWithoutPort.split(".");
    // Remove 'localhost' part (usually last)
    return parts.slice(0, parts.length - 1).join(".");
  }

  // For other domains, split by dots
  const parts = hostname.split(".");

  // If domain has subdomains (more than 2 parts), return first part as tenant
  if (parts.length > 2) {
    return parts[0];
  }

  // If no subdomain, return empty string (no tenant)
  return "";
}


import { useState, useEffect } from "react";

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
