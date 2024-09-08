/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";

import { themeSessionResolver } from "@/components/ui/session.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import { Moon, Sun } from "lucide-react";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { Button } from "./components/ui/button";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "app/tailwind.css" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({
  request,
}: {
  request: ClientLoaderFunctionArgs["request"];
}) => {
  const { getTheme } = await themeSessionResolver(request);

  return {
    theme: getTheme(),
  };
};

function App() {
  const data = useLoaderData();
  const [theme, setTheme] = useTheme();
  return (
    <html lang="en" data-theme={theme} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {/* @ts-ignore */}
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="dark:bg-primary dark:text-white w-full h-full">
        <Button
          variant="outline"
          size="icon"
          className="border-none absolute top-2 right-2 dark:bg-primary dark:text-white hover:bg-background shadow-xl"
        >
          <Sun
            onClick={() => setTheme(Theme.DARK)}
            className="absolute size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            onClick={() => setTheme(Theme.LIGHT)}
            className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider
      // @ts-ignore
      specifiedTheme={data.theme}
      themeAction="/set-theme"
      disableTransitionOnThemeChange={true}
    >
      <App />
    </ThemeProvider>
  );
}
