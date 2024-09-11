import { Form } from "@remix-run/react";
import { Edit, Trash } from "lucide-react";
import { Button } from "./button";

export default function Todos({
  todos,
}: {
  todos: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
}) {
  return (
    <ul className="flex flex-col gap-6">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex flex-col gap-3 max-w-sm justify-center items-start hover:z-[100] p-3 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-full flex justify-between items-center">
            <span className="md:text-2xl text-xl font-bold w-max">
              {todo.title}
            </span>
            <span
              className={`px-2 py- rounded-full text-sm font-medium w-auto ${
                todo.completed ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {todo.completed ? "Completed" : "Not completed"}
            </span>
          </div>
          <section className="text-left w-full">
            <p className="text-lg text-gray-200">{todo.description}</p>
          </section>
          <section className="w-full flex justify-center items-center">
            <Form method="post" action="/todos/toggle">
              <input type="hidden" name="todoId" value={todo.id} readOnly />
              <Button
                variant="default"
                size="sm"
                className="bg-purple-500 hover:bg-purple-600"
              >
                Mark as {todo.completed ? "not completed" : "completed"}
              </Button>
            </Form>
          </section>
          <section className="w-full flex justify-evenly items-center gap-4">
            <Form method="post" action="/todos/delete">
              <input type="hidden" name="todoId" value={todo.id} readOnly />
              <Button
                variant="outline"
                size="sm"
                type="submit"
                className="border-none bg-transparent hover:bg-transparent text-white hover:text-purple-400"
              >
                <Trash className="h-full w-full" />
              </Button>
            </Form>
            <Button
              variant="outline"
              size="sm"
              className="border-none bg-transparent hover:bg-transparent text-white hover:text-purple-400 active:scale-95"
              onClick={() => {
                window.location.href = "/todos/edit/" + todo.id;
              }}
            >
              <Edit className="h-full w-full" />
            </Button>
          </section>
        </li>
      ))}
    </ul>
  );
}
