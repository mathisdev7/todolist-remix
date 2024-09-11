import getSession from "@/auth/utils/getSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { prisma } from "@/lib/prismaClient";
import {
  Form,
  json,
  Params,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

type ActionData = {
  error?: string;
  success?: string;
};

type LoaderData = {
  userId: string;
  todo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
};

export const loader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const session = await getSession(request);
  const { todoId } = params;
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }
  if (!todoId) {
    return redirect("/");
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId as string,
    },
    select: {
      id: true,
      title: true,
      description: true,
      completed: true,
    },
  });
  if (!todo) {
    return redirect("/");
  }

  return json({ userId, todo });
};

export default function EditTodo() {
  const actionData: ActionData | undefined = useActionData();
  const loaderData: LoaderData | undefined = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (actionData) {
      setIsLoading(false);
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gap-6 relative top-8">
      <Form
        method="post"
        action="/todos/edit"
        className="w-full max-w-sm bg-white shadow-xl rounded-lg p-6 flex flex-col gap-6"
      >
        {actionData?.error && (
          <p className="text-red-600 flex flex-row items-center gap-2 w-full text-center justify-center">
            <AlertTriangle className="size-5" />
            {actionData.error}
          </p>
        )}
        <h1 className="text-3xl font-bold text-center text-[#581d93]">
          Edit todo
        </h1>
        <section className="flex flex-col gap-4 w-full text-black">
          <input
            type="hidden"
            name="todoId"
            value={loaderData?.todo.id}
            readOnly
          />
          <Input
            name="title"
            type="text"
            disabled={isLoading}
            defaultValue={loaderData?.todo.title}
            placeholder={loaderData?.todo.title}
          />
          <Input
            name="description"
            type="text"
            disabled={isLoading}
            defaultValue={loaderData?.todo.description}
            placeholder={loaderData?.todo.description}
          />
          <Button
            variant="default"
            size="lg"
            type="submit"
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600"
          >
            {isLoading && <Icons.spinner className="size-5 animate-spin" />}
            Edit Todo
          </Button>
        </section>
      </Form>
    </div>
  );
}
