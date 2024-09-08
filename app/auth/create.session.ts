import { redirect } from "@remix-run/node";
import sessionStorage from "./auth.session";
import getSession from "./utils/getSession";

const USER_SESSION_KEY = "userId";

export async function createUserSession({
  request,
  userId,
}: {
  request: Request;
  userId: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);

  const cookieHeader = await sessionStorage.commitSession(session, {
    maxAge: 60 * 60 * 24 * 7,
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
}
