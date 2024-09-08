/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Theme, useTheme } from "remix-themes";

export function ModeToggle() {
  const [theme, setTheme, { definedBy }] = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
