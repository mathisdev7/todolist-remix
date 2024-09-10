import { createUserSession } from "@/auth/create.session";
import { prisma } from "@/lib/prismaClient";
import { ActionFunction, json } from "@remix-run/node";
import bcrypt from "bcryptjs";

export const getUserAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }
  const passwordDehashed = await bcrypt.compare(password, user.password);
  if (!passwordDehashed) {
    return json({ error: "Invalid password" }, { status: 401 });
  }
  const redirectResult = await createUserSession({
    request,
    userId: user.id,
  });
  return redirectResult;
};
