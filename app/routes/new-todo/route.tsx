import getSession from "@/auth/utils/getSession";
import { createTodoAction } from "@/components/actions/createTodo.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { AlertTriangle, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

type ActionData = {
  error?: string;
  success?: string;
};

type LoaderData = {
  userId: string;
};

export const action = createTodoAction;

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  return json({ userId });
};

export default function NewTodo() {
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
        action="/new-todo"
        className="w-full max-w-sm bg-white shadow-xl rounded-lg p-6 flex flex-col gap-6"
      >
        {actionData?.error && (
          <p className="text-red-600 flex flex-row items-center gap-2 w-full text-center justify-center">
            <AlertTriangle className="size-5" />
            {actionData.error}
          </p>
        )}
        <h1 className="text-3xl font-bold text-center text-[#581d93]">
          Create a todo
        </h1>
        <section className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:border-[#581d93] transition-all text-black"
          />
          <input type="hidden" name="userId" value={loaderData.userId} />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:border-[#581d93] transition-all text-black"
          />
        </section>
        <Button
          className="bg-[#581d93] text-white w-full py-2 rounded-md hover:bg-[#6a24aa] transition-all"
          onClick={() => setIsLoading(true)}
          type="submit"
        >
          {isLoading && <Icons.spinner className="mr-2 animate-spin" />}
          {isLoading ? "Creating..." : "Create Todo"}
        </Button>
      </Form>
      {actionData?.error && (
        <p className="text-red-600 flex items-center gap-2">
          <CircleAlert /> {actionData.error}
        </p>
      )}
    </div>
  );
}
