## Project Overview

This project is a simple Todo application built using [Remix](https://remix.run/) and [Vite](https://vitejs.dev/). It includes basic functionality for creating, editing, deleting, and toggling todos, as well as user authentication. This project was created primarily to test Remix and explore its features.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) pre-configured for a simple and elegant default styling. You can easily swap out Tailwind for any other CSS framework of your choice. For more information on customizing your CSS setup with Vite, refer to the [Vite CSS documentation](https://vitejs.dev/guide/features.html#css).

## Server Actions

### `createTodoAction`

**File:** `app/components/actions/todo/createTodo.action.ts`

- **Description:** Creates a new todo item.
- **Request Data:**
  - `title`: The title of the todo item.
  - `description`: A description of the todo item.
  - `userId`: The ID of the user creating the todo.
- **Response:**
  - **Success:** Redirects to the homepage.
  - **Error:** Returns an error message.

### `deleteTodoAction`

**File:** `app/components/actions/todo/deleteTodo.action.ts`

- **Description:** Deletes an existing todo item.
- **Request Data:**
  - `todoId`: The ID of the todo item to delete.
- **Response:**
  - **Success:** Redirects to the homepage.
  - **Error:** Returns an error message.

### `toggleTodoAction`

**File:** `app/routes/todos.toggle.tsx`

- **Description:** Toggles the completion status of a todo item.
- **Request Data:**
  - `todoId`: The ID of the todo item to toggle.
- **Response:**
  - **Success:** Redirects to the homepage.
  - **Error:** Returns an error message.

### `editTodoAction`

**File:** `app/routes/todos.edit.tsx`

- **Description:** Edits an existing todo item.
- **Request Data:**
  - `todoId`: The ID of the todo item to edit.
  - `title`: The updated title of the todo item.
  - `description`: The updated description of the todo item.
- **Response:**
  - **Success:** Redirects to the homepage.
  - **Error:** Returns an error message.

### `createUserAction`

**File:** `app/components/actions/user/createUser.action.ts`

- **Description:** Creates a new user account.
- **Request Data:**
  - `email`: The user's email address.
  - `password`: The user's chosen password.
  - `name`: The user's name.
- **Response:**
  - **Success:** Creates a user session and redirects to the homepage.
  - **Error:** Returns an error message.

### `getUserAction`

**File:** `app/components/actions/user/getUser.action.ts`

- **Description:** Authenticates a user and creates a session.
- **Request Data:**
  - `email`: The user's email address.
  - `password`: The user's password.
- **Response:**
  - **Success:** Creates a user session and redirects to the homepage.
  - **Error:** Returns an error message.

## Routes

### `/`

**File:** `app/routes/_index.tsx`

- **Description:** The homepage of the application. Displays a welcome message and a list of todos for the logged-in user. Provides options to create an account or log in if the user is not logged in.

### `/todos/new`

**File:** `app/routes/todos.new.tsx`

- **Description:** Page for creating a new todo. Displays a form for entering the title and description of the todo. Redirects to the login page if the user is not logged in.

### `/todos/edit/:todoId`

**File:** `app/routes/todos.edit.$todoId.tsx`

- **Description:** Page for editing an existing todo. Displays a pre-filled form with the todo's information. Redirects if the user is not logged in or if the todo does not exist.

### `/register`

**File:** `app/routes/register/route.tsx`

- **Description:** Page for creating a new user account. Displays a form for entering email, name, and password. Redirects to the homepage if the user is already logged in.

### `/login`

**File:** `app/routes/login/route.tsx`

- **Description:** Page for logging in to an existing user account. Displays a form for entering email and password. Redirects to the homepage if the user is already logged in.
