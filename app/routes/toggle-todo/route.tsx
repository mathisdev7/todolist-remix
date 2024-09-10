import { prisma } from "@/lib/prismaClient";
import { json, redirect } from "@remix-run/node";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const todoId = formData.get("todoId");

  if (typeof todoId !== "string") {
    return json({ error: "Invalid todo ID" }, { status: 400 });
  }

  const todo = await prisma.todo.findUnique({ where: { id: todoId } });
  if (todo) {
    await prisma.todo.update({
      where: { id: todoId },
      data: { completed: !todo.completed },
    });
  }

  return redirect("/");
};
