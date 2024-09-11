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
import { Home, LogIn, LogOut, Moon, PlusCircle, Sun } from "lucide-react";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import getSession from "./auth/utils/getSession";
import { Button } from "./components/ui/button";
import { FloatingDock } from "./components/ui/floating-dock";
import "./styles/tailwind.css";

type LoaderData = {
  theme: Theme;
  userId: string | null;
};

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
  { rel: "stylesheet", href: "/app/styles/tailwind.css" },
];

export const loader: LoaderFunction = async ({
  request,
}: {
  request: ClientLoaderFunctionArgs["request"];
}) => {
  const { getTheme } = await themeSessionResolver(request);
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) {
    return {
      theme: getTheme(),
      userId: null,
    };
  }

  return {
    theme: getTheme(),
    userId,
  };
};

function App() {
  const data: LoaderData = useLoaderData();
  const [theme, setTheme] = useTheme();
  const links = [
    {
      title: "Home",
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: data.userId ? "Logout" : "Login",
      icon: data.userId ? (
        <LogOut className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ) : (
        <LogIn className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: data.userId ? "/logout" : "/login",
    },
  ];
  if (data.userId) {
    links.unshift({
      title: "New Todo",
      icon: (
        <PlusCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/todos/new",
    });
  }
  return (
    <html lang="en" data-theme={theme} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <Meta />
        {/* @ts-ignore */}
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="dark:bg-primary dark:text-white w-full h-full">
        <div className="fixed flex flex-row w-full justify-center items-end bottom-8 z-50">
          <FloatingDock
            items={links}
            desktopClassName="z-50 shadow-xl"
            mobileClassName="z-50 shadow-xl"
          />
        </div>
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
