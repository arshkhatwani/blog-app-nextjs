import { getServerSession } from "next-auth";
import prisma from "@/db";

export default async function getUserDetails() {
    const session = await getServerSession();
    const email = session?.user.email;
    if (!email) return;

    const user = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    return user;
}
