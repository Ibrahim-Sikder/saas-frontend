import { useState, useEffect } from "react";

export function getTenantDomain(hostname) {
  if (!hostname) return "";

  if (hostname.includes("localhost")) {
    const hostWithoutPort = hostname.split(":")[0];
    const parts = hostWithoutPort.split(".");
    return parts.slice(0, parts.length - 1).join(".");
  }

  const parts = hostname.split(".");

  // Return first subdomain if exists
  if (parts.length > 2) {
    return parts[0];
  }

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