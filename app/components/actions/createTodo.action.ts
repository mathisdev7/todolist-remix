import { ActionFunction, json } from "@remix-run/node";

export const createTodoAction: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  const title = body.get("title");
  const description = body.get("description");

  if (!title) {
    return new Response("Le titre est requis", {
      status: 400,
    });
  }
  if (!description) {
    return new Response("La description est requise", {
      status: 400,
    });
  }

  return json({
    success: `Todo créé avec succès\n\n${title}\n\n${description}`,
  });
};
