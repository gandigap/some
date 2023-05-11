import express from "express";
import path from "path";
import fs from "node:fs/promises";
import { fileURLToPath } from "url";
import { createServer } from "vite";
const ansi = {
  space: () => " ",
  newLine: () => "\n",
  bold: (string) => `\x1B[1m${string}\x1B[22m`,
  cyan: (string) => `\x1B[36m${string}\x1B[0m`,
  underline: (string) => `\x1B[4m${string}\x1B[24m`
};
const print = (string) => {
  process.stdout.write(string);
};
const dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 6969;
const info = [
  ansi.newLine(),
  ansi.bold("Local:"),
  ansi.space(),
  ansi.underline(ansi.cyan(`http://127.0.0.1:${port}`)),
  ansi.newLine()
];
async function startServer() {
  const app = express();
  const vite = await createServer({
    server: {
      middlewareMode: true
    },
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const file = await fs.readFile(path.resolve(dirname, "../index.html"), "utf-8");
      const html = await vite.transformIndexHtml(url, file);
      const [beforeOutlet, afterOutlet] = html.split("<!--ssr-outlet-->");
      res.write(beforeOutlet);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { stream, injectPreload } = await render(url, {
        onShellReady() {
          stream.pipe(res);
        },
        onShellError(error) {
          res.status(500);
          res.setHeader("Content-type", "text/html");
          res.send(`<h1>${error.message}</h1>`);
        },
        onAllReady() {
          const preloaded = afterOutlet.replace("<!--preload-->", injectPreload());
          res.write(preloaded);
          res.end();
        },
        onError(error) {
          print(String(error));
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
  app.listen(port, () => {
    print(info.join(""));
  });
}
startServer();
//# sourceMappingURL=index.js.map
