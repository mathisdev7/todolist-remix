import sessionStorage from "../auth.session";

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export default getSession;
