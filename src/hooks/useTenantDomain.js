import { useState, useEffect } from "react";
import { getTenantDomain } from "../utils/getTenantDomain";
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
