import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signOut } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const options: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { userId, password } = credentials;
        const response = await fetch(apiUrl + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            password: password,
          }),
        });

        const user = await response.json();

        if (response.ok && user.meta.statusCode === 200) {
          // Filter out the password from the user object
          const { password, ...userWithoutPassword } = user.data.user;
          return {
            ...userWithoutPassword,
            accessToken: user.data.accessToken ?? null,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "projectmediapembelajaran",

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken ?? null,
          id: user.id ?? null,
          userId: user.userId ?? null,
          name: user.name ?? null,
          phoneNumber: user.phoneNumber ?? null,
          role: user.role ?? null,
          createdAt: user.createdAt ?? null,
          updatedAt: user.updatedAt ?? null,
          Admin: user.Admin ?? null,
          Guru: user.Guru ?? null,
          Murid: user.Murid ?? null,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken ?? null;
      session.user = {
        id: token.id ?? null,
        userId: token.userId ?? null,
        name: token.name ?? null,
        phoneNumber: token.phoneNumber ?? null,
        role: token.role ?? null,
        createdAt: token.createdAt ?? null,
        updatedAt: token.updatedAt ?? null,
        Admin: token.Admin ?? null,
        Guru: token.Guru ?? null,
        Murid: token.Murid ?? null,
      };

      // Optional: fetch additional data if needed
      try {
        const response = await fetch(apiUrl + "/auth/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: token.id,
          }),
        });

        const resp = await response.json();
        if (resp.message === "Unauthenticated.") {
          signOut();
          return;
        }
        session.user = {
          ...session.user,
          Admin: resp.data.Admin ?? session.user.Admin,
          Guru: resp.data.Guru ?? session.user.Guru,
          Murid: resp.data.Murid ?? session.user.Murid,
        };
      } catch (e) {
        console.error(e);
      }
      return session;
    },
  },
};

export default NextAuth(options);
