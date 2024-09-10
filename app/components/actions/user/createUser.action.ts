import { createUserSession } from "@/auth/create.session";
import { prisma } from "@/lib/prismaClient";
import { ActionFunction, json } from "@remix-run/node";
import bcrypt from "bcryptjs";

export const createsUserAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return json(
      { error: "Email, password and name are required" },
      { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return json({ error: "User already exists" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  const redirectResult = await createUserSession({
    request,
    userId: newUser.id,
  });
  return redirectResult;
};
