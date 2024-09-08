import getSession from "@/auth/utils/getSession";
import { getUserAction } from "@/components/actions/getUser.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/lib/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export const action = getUserAction;

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  console.log(session.data);

  if (userId) {
    return redirect("/");
  }

  return json({ userId });
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gap-6 relative top-8">
      <h1 className="text-3xl font-bold text-center">Login to your account</h1>
      <Form
        method="post"
        action="/login"
        onSubmit={() => {
          setIsLoading(true);
        }}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" id="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 animate-spin" />}
              Sign in
            </Button>
            <Button className="w-full" variant="outline">
              <GitHubLogoIcon className="size-6 mr-2" />
              Sign in with GitHub
            </Button>
            <Button className="w-full" variant="outline">
              <Icons.google className="size-5 mr-2" />
              Sign in with Google
            </Button>
          </CardFooter>
        </Card>
      </Form>
      <Card className="w-full max-w-sm h-auto text-center py-2">
        <CardDescription>
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-primary font-bold underline">
            Register
          </a>
        </CardDescription>
        <CardDescription>
          Forgot your password?{" "}
          <a
            href="/forgot-password"
            className="text-primary font-bold underline"
          >
            Reset
          </a>
        </CardDescription>
      </Card>
    </div>
  );
}
