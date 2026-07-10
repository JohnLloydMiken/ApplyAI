// signup-card.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpCardProps {
  cardTitle?: string;
  cardDescription?: string;
}

export default function SignUpCard({
  cardTitle = "Create your account",
  cardDescription = "Enter your details below — it takes less than a minute.",
}: SignUpCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="mt-8 w-full shadow-card">
      <CardHeader>
        <CardTitle className="font-sans text-xl">{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
        <CardAction>
          <Button variant="link" asChild className="px-0 text-primary">
            <Link href="/account/login">Log in</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" autoComplete="name" placeholder="Jane Doe" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Use at least 8 characters.</p>
          </div>

          <Button type="submit" className="w-full shadow-btn">
            Create account
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" type="button" className="w-full gap-2">
          <SiGoogle className="h-4 w-4" />
          Continue with Google
        </Button>
      </CardContent>

      <CardFooter>
        <p className="text-xs leading-relaxed text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}