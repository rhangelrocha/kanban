import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { userService } from "@/server/services/userService";

export default {
    providers: [
        Credentials({
            name: "credentials",
            id: 'credentials',
            credentials: {
                email: { label: "E-mail", type: "text", placeholder: "email" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                };
        
                // return userService.authenticate(email, password);
                try {
                    const user = await userService.authenticate(email, password);
                    // console.log('Callback user: ', {user});
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                    return null;
                }
            }
        })
    ],
} satisfies NextAuthConfig