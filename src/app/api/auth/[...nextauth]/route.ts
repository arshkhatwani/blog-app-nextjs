import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter your email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password as string;

                if (!email || !password) return null;

                try {
                    const storedUser = await prisma.user.findFirst({
                        where: {
                            email,
                        },
                    });
                    if (!storedUser) {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const newUser = await prisma.user.create({
                            data: {
                                email: email,
                                name: "NEW_USER",
                                password: hashedPassword,
                            },
                        });
                        return {
                            id: newUser.id,
                            email: newUser.email,
                            name: newUser.name,
                        };
                    }

                    const isPassCorrect = await bcrypt.compare(
                        password,
                        storedUser.password
                    );
                    if (!isPassCorrect) return null;
                    return {
                        id: storedUser.id,
                        email: storedUser.email,
                        name: storedUser.name,
                    };
                } catch (error) {
                    console.log(
                        "Some error occured with authentication",
                        error
                    );
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt({ token, trigger, session }) {
            // console.log("trigger", trigger);
            // console.log("session", session);
            if (trigger === "update" && session?.user?.name) {
                token.name = session.user.name;
            }
            // console.log("token", token);
            return token;
        },
        session({ token, trigger, session }) {
            if (session.user) {
                session.user.id = token.sub as string;
            }
            // console.log('session', session)
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
