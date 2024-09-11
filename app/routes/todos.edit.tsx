import { prisma } from "@/lib/prismaClient";
import { json, redirect } from "@remix-run/node";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const todoId = formData.get("todoId");
  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof todoId !== "string") {
    return json({ error: "Invalid todo ID" }, { status: 400 });
  }

  if (typeof title !== "string") {
    return json({ error: "Title is required" }, { status: 400 });
  }
  if (typeof description !== "string") {
    return json({ error: "Description is required" }, { status: 400 });
  }
  if (title.length > 20) {
    return json({ error: "Title is too long" }, { status: 400 });
  }
  if (description.length > 100) {
    return json({ error: "Description is too long" }, { status: 400 });
  }

  const todo = await prisma.todo.findUnique({ where: { id: todoId } });
  if (todo) {
    await prisma.todo.update({
      where: { id: todoId },
      data: { title: title, description: description },
    });
  }

  return redirect("/");
};
