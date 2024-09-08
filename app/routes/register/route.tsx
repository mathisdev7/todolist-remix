import getSession from "@/auth/utils/getSession";
import { createsUserAction } from "@/components/actions/createUser.action";
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
  "A simple signup form with email, name and password. The submit button says 'Sign up'.";

export const action = createsUserAction;

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (userId) {
    return redirect("/");
  }

  return json({ userId });
};

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gap-6 relative top-8">
      <h1 className="text-3xl font-bold text-center">Create an account</h1>
      <Form
        method="post"
        action="/register"
        onSubmit={() => {
          setIsLoading(true);
        }}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Enter your email below to create an account.
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" id="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 animate-spin" />}
              Sign up
            </Button>
            <Button className="w-full" variant="outline">
              <GitHubLogoIcon className="size-6 mr-2" />
              Sign up with GitHub
            </Button>
            <Button className="w-full" variant="outline">
              <Icons.google className="size-5 mr-2" />
              Sign up with Google
            </Button>
          </CardFooter>
        </Card>
      </Form>
      <Card className="w-full max-w-sm h-auto text-center py-2">
        <CardDescription>
          Already have an account?{" "}
          <a href="/login" className="text-primary font-bold underline">
            Login
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
