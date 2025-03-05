"use client";

import CustomButton from "@/components/custom-button/custom-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginCredentials } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { ComponentPropsWithoutRef, useActionState } from "react";

export function LoginForm({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const [state, formAction] = useActionState(LoginCredentials, null);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials below to login to your account</CardDescription>
          {state?.message && (
            <Alert className="dark:bg-[#F87171]" variant={"destructive"}>
              <AlertCircle className="h-4 w-4 dark:text-white" />
              <AlertTitle className="dark:text-white">Error</AlertTitle>
              <AlertDescription className="dark:text-white">{state.message}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" placeholder="Username" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.username}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" placeholder="********" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.password}</span>
                </div>
              </div>
              <CustomButton title="Login" titlePending="Logging in..." />
            </div>
            <div className="mt-4 text-center text-sm"></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
