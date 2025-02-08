import { AuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";
import { env } from "process";

const authOptions: AuthOptions = {
	providers: [
		Discord({
			clientId: env.DISCORD_ID as string,
			clientSecret: env.DISCORD_SECRET as string,
			authorization: { params: { scope: "identify email" } },
		}),
	],
	secret: env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				return {
					...token,
					id: user.id,
					isAdmin: false,
				};
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
};

export default authOptions;
