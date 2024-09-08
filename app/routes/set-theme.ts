import { themeSessionResolver } from "@/components/ui/session.server";
import { createThemeAction } from "remix-themes";

export const action = createThemeAction(themeSessionResolver);
