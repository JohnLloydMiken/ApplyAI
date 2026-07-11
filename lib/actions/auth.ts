"use server";
import prisma from "../prisma";
import bcrypt from "bcryptjs";


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
  //check existing users via credentials provider

  const existing = await prisma.user.findUnique({
    where: { email: user_email },
  });

  if (existing) {
    return { error: "Email already in use" };
  }

  const hashed = await bcrypt.hash(user_password, 12);

  await prisma.user.create({
    data: {
      email: user_email,
      name: user_name,
      password: hashed,
    },
  });
  return { success: true };
}
