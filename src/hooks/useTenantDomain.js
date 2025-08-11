import { useState, useEffect } from "react";

export function getTenantDomain(hostname) {
  if (!hostname) return "";

  // Handle localhost separately (remove port if any)
  if (hostname.includes("localhost")) {
    const hostWithoutPort = hostname.split(":")[0]; // Remove port if exists
    const parts = hostWithoutPort.split(".");
    // Remove 'localhost' (last part), return everything before that as tenant
    return parts.slice(0, parts.length - 1).join(".");
  }

  const parts = hostname.split(".");

  // For domains with subdomains: remove last two parts (domain + tld),
  // return everything before as tenant domain
  if (parts.length > 2) {
    return parts.slice(0, parts.length - 2).join(".");
  }

  // No subdomain found
  return "";
}

export function useTenantDomain() {
  const [tenantDomain, setTenantDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const tenant = getTenantDomain(hostname);
      setTenantDomain(tenant);
    }
  }, []);

  return tenantDomain;
}
