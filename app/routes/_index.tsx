import getSession from "@/auth/utils/getSession";
import { Button } from "@/components/ui/button";
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
  } | null;
  todos: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
};

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) {
    return json({ user: null, todos: [] });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });
  if (!user) {
    return json({ user: null });
  }
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  return json({ user, todos });
};

export default function Index() {
  const { user, todos } = useLoaderData() as LoaderData;
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gap-6 relative top-8">
      {user ? (
        <h1 className="text-3xl font-bold text-center">
          Welcome back,
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b897d9] to-[#581d93]">
            {" "}
            {user.name}.
          </span>
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-center">
          Welcome to
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b897d9] to-[#581d93]">
            {" "}
            the best todo app ever.
          </span>
        </h1>
      )}
      {!user?.name && (
        <ul className="grid gap-4">
          <Button
            className="w-full max-w-sm bg-[#9435f3] hover:bg-[#9435f3]"
            variant="default"
            size={"lg"}
          >
            Create an account
          </Button>
          <Button
            className="w-full max-w-sm bg-[#581d93] hover:bg-[#581d93]"
            variant={"default"}
            size={"lg"}
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login to your account
          </Button>
        </ul>
      )}
      {todos.length > 0 ? (
        <ul className="flex flex-col gap-4 justify-center items-center w-full">
          <Button
            className="w-auto max-w-sm bg-[#9435f3] hover:bg-[#9435f3]"
            onClick={() => {
              window.location.href = "/new-todo";
            }}
            variant="default"
            size="lg"
          >
            Create a new todo
          </Button>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col gap-2 w-auto justify-center items-center p-2 rounded-md shadow-md bg-[#581d93] text-white"
            >
              <span className="text-xl font-semibold">{todo.title}</span>
              <section className="flex flex-col gap-1">
                <span className="text-lg">{todo.description}</span>
                <p className="text-md text-center">
                  {todo.completed ? "Completed" : "Not completed"}
                </p>
              </section>
            </li>
          ))}
        </ul>
      ) : user?.name ? (
        <ul className="grid gap-4">
          <Button
            className="w-full max-w-sm bg-[#9435f3] hover:bg-[#9435f3]"
            onClick={() => {
              window.location.href = "/new-todo";
            }}
            variant="default"
            size="lg"
          >
            Create a new todo
          </Button>
          <p className="text-center font-sans">There are no todos yet.</p>
        </ul>
      ) : null}
    </div>
  );
}
