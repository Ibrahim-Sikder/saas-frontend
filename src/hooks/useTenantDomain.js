import { useState, useEffect } from "react";

export function getTenantDomain(hostname) {
  if (!hostname) return "";

  // Handle localhost separately, remove port if any
  if (hostname.includes("localhost")) {
    const hostWithoutPort = hostname.split(":")[0]; // e.g. garage.worldautosolution.com.localhost
    const parts = hostWithoutPort.split(".");
    // Remove 'localhost' part (last part)
    return parts.slice(0, parts.length - 1).join(".");
  }

  // For live domains, return the full hostname as tenant domain
  return hostname;
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
