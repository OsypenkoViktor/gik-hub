import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
const bcrypt = require("bcrypt");

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials?.username) {
          return null;
        }
        try {
          const userAuth = await User.findOne({
            where: { username: credentials?.username },
          });
          if (!userAuth) return null;
          const result = await bcrypt.compare(
            credentials.password,
            userAuth.dataValues.password
          );
          if (result) {
            return {
              id: userAuth.dataValues.id,
              name: userAuth.dataValues.username,
              email: userAuth.dataValues.email,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 5,
  },
  pages: {
    signIn: "signIn",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
