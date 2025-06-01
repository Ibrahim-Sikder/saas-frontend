import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@mui/x-date-pickers/AdapterDateFns": "@mui/x-date-pickers/AdapterDateFnsV3",
    },
  },
});
