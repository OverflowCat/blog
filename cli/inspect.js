import { dev } from "astro";
const devServer = await dev({
  root: "./",
});

// Stop the server if needed
// await devServer.stop();
