import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./cert/create-cert-key.pem"),
      cert: fs.readFileSync("./cert/create-cert.pem"),
    },
    port: 5173,
    host: "0.0.0.0",
    open: false,
  },
});
