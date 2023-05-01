import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, account }) {
			account && (token.accessToken = account.access_token);
			return token;
		},
		async session({ session, token }: any) {
			session.user.token = token.accessToken;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
