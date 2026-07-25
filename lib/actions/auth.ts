"use server";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

interface SignUpData {
  user_email: string;
  user_name: string;
  user_password: string;
}

export async function signUp({
  user_email,
  user_name,
  user_password,
}: SignUpData) {
  const email = user_email.trim().toLowerCase();
  const name = user_name.trim();

  // basic server-side validation — client-side checks alone can be bypassed
  // since server actions can be invoked directly
  if (!email || !name || !user_password) {
    return { error: "Please fill in all required fields" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address" };
  }

  if (user_password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const hashed = await bcrypt.hash(user_password, 12);

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });
  } catch (err) {
    // catch the race condition instead of relying on a separate findUnique check
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { error: "Email already in use" };
    }
    console.error("signUp error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}