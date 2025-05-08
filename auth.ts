import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { TOKEN_REFRESH } from "@/functions/api/api"

async function refreshAccessToken(token : any) {
  const { url } = TOKEN_REFRESH()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        cookie: `jrt=${token?.accessToken};`
      },
    })
    console.log(response);

    const refreshedTokens = await response.json();


    if (!response.ok) {
      throw refreshedTokens
    }
    console.log(refreshedTokens.token);
    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    }
  } catch (error) {
    // console.log(response);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/login",
        verifyRequest: "/auth/login",
        newUser: "/dashboard"
    },
    callbacks: {
        async jwt({ token, account, session, user, trigger }) { 
          // if (user) token.user = user;
          if(account && account.type === "credentials") {
            token.userId = account.providerAccountId;
            token.accessToken = user.token;
          }

          if (token.exp && Date.now() < token.exp) {
            return token
          }
          
          // console.log('Callback Account: ', { token });
          // console.log(Date.now());
          // return refreshAccessToken(token);
          return token
        },
        async session({ session, token }) { 
          // console.log("Callback Session: ", { session });
          session.user.id = token.userId;
          session.accessToken = token.accessToken;
          return session;
        },
    },    
    session: { strategy: "jwt" },
    ...authConfig
})