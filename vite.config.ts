import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const cherryPickedKeys = ["BASE_URL_BACKEND"];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
  };
});
