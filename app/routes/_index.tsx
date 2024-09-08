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
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gap-6 relative top-8">
      <h1 className="text-3xl font-bold text-center">
        Welcome back,
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b897d9] to-[#581d93]">
          {" "}
          {data.user.name}.
        </span>
      </h1>
      <p className="text-center font-sans">There are no todos yet.</p>
    </div>
  );
}
