import { prisma } from "@/lib/prismaClient";
import { json, redirect } from "@remix-run/node";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const todoId = formData.get("todoId");

  if (typeof todoId !== "string") {
    return json({ error: "Invalid todo ID" }, { status: 400 });
  }
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });
  if (!todo) {
    return json({ error: "Todo not found" }, { status: 404 });
  }

  await prisma.todo.delete({
    where: { id: todoId },
  });

  return redirect("/");
};
