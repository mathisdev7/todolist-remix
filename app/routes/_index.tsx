import getSession from "@/auth/utils/getSession";
import { prisma } from "@/lib/prismaClient";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
type LoaderData = {
  user: {
    name: string;
  };
};

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });
  return json({ user });
};

export default function Index() {
  const data: LoaderData = useLoaderData();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl font-bold">
        Welcome to Remix, {data.user.name}!
      </h1>
    </div>
  );
}
