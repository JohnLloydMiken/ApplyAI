// app/api/auth/[...nextauth]/route.ts
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

// used to keep authorize() timing constant when a user isn't found,
// so response time doesn't leak which emails are registered.
// generate your own once via bcrypt.hashSync("anything", 12) and swap it in.
const DUMMY_HASH =
  "$2b$12$qzYUMoLs05akp9766i4XG.QyOvVoVRLho5QUwFEbILQDNg7vfbJga";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            if (process.env.NODE_ENV === "development") {
              console.log("Missing email or password");
            }
            return null;
          }

          const email = credentials.email.trim().toLowerCase();

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            // burn equivalent time to a real comparison so a missing user
            // and a wrong password are indistinguishable by response time
            await bcrypt.compare(credentials.password, DUMMY_HASH);
            if (process.env.NODE_ENV === "development") {
              console.log("User not found:", email);
            }
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            if (process.env.NODE_ENV === "development") {
              console.log("Wrong password for:", email);
            }
            return null;
          }

          if (process.env.NODE_ENV === "development") {
            console.log("Auth success:", user.email);
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (e) {
          console.error("Authorize error:", e);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: { signIn: "/account/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };