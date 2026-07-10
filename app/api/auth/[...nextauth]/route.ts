import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";


export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials){
        try{
          if (!credentials?.email || !credentials.password){
            console.log("Missing Email or PAssword")
            return null
          }

          const user = await prisma.user.findUnique({
            where: {email: credentials.email}
          })
          if (!user || !user.password){
            console.log("User Not Found:", credentials.email)
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user?.password);
          if(!isValid){
            console.log("Wrong Password")
            return null
          }
           console.log("Auth success:", user.email);

           return {
            id: user?.id,
            email: user?.email,
           }
        }catch(e){
          console.error("Authorize error:", e);
          return null;
        }
      }
    })
  ],

  callbacks:{
  async jwt({token, user}){
      if (user) {
        token.id = user.id
        
      }
      return token;
    },
     async session({session, token}){
      if (token && session.user) {
      session.user.id = token.id as string;
      
    }
    return session;
  
  },
  },
 
   pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
