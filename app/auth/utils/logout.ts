import { redirect } from "@remix-run/node";
import sessionStorage from "../auth.session";
import getSession from "./getSession";

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
