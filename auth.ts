import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials: Partial<Record<"username" | "password", unknown>>) => {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }
        const { username, password } = validateFields.data;
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isValid = compareSync(password, user.password);

        if (!isValid) {
          return null;
        }
        // return user object with their profile data
        return {
          id: user.id,
          nama: user.nama,
          username: user.username,
          jabatan: user.jabatan,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoute = ["/dashboard"];
      if (!isLoggedIn && ProtectedRoute.some((route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/"))) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
      if (isLoggedIn && nextUrl.pathname.startsWith("/auth/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (isLoggedIn) {
        if (nextUrl.pathname === "/") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      } else {
        if (nextUrl.pathname === "/" || ProtectedRoute.some((route) => nextUrl.pathname.startsWith(route))) {
          return Response.redirect(new URL("/auth/login", nextUrl));
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.nama = user.nama;
        token.username = user.username;
        token.jabatan = user.jabatan;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.nama = token.nama;
      session.user.username = token.username;
      session.user.jabatan = token.jabatan;

      return session;
    },
  },
});
