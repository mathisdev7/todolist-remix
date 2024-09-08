import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__remix-themes",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET as string],
    secure: true,
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
