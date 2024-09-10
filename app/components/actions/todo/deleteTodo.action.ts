import { prisma } from "@/lib/prismaClient";
import { ActionFunction, json } from "@remix-run/node";

export const deleteTodoAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const userId = formData.get("userId") as string;

  if (!title) {
    return json({ error: "Title is required" }, { status: 400 });
  }
  if (!description) {
    return json({ error: "Description is required" }, { status: 400 });
  }
  if (!userId) {
    return json({ error: "User ID is required" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }
  const todoExists = await prisma.todo.findFirst({
    where: {
      title,
      userId,
    },
  });
  if (todoExists) {
    return json({
      error: "Todo already exists",
    });
  }

  await prisma.todo.create({
    data: {
      title,
      userId,
      completed: false,
      description,
    },
  });

  return json({
    success: "Todo created successfully",
  });
};
