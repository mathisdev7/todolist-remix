import { createTodoAction } from "@/components/actions/createTodo.action";
import { Form, useActionData } from "@remix-run/react";

type ActionData = {
  error?: string;
  success?: string;
};

export const action = createTodoAction;

export default function ActionExample() {
  const actionData: ActionData | undefined = useActionData();

  return (
    <div>
      <h1>Create a todo</h1>
      <Form method="post">
        <input type="text" name="title" placeholder="Titre" />
        <input type="text" name="description" placeholder="Description" />
        <button type="submit">Soumettre</button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      {actionData?.success && <p>{actionData.success}</p>}
    </div>
  );
}
