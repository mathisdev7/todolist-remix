/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "vercel",
  ignoredRouteFiles: ["**/.*"],
  server: "./build/index.js",
  future: {
    v2_routeConvention: true, // Si tu utilises les conventions de Remix v2
  },
};
