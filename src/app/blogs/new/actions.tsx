"use server";

import getUserDetails from "@/app/utils/getUserDetails";
import prisma from "@/db";

export async function createBlog(data: { title: string; body: any }) {
    const { title, body } = data;
    const user = await getUserDetails();
    if(!user) return;
    const userId = user?.id as string;

    const newBlog = await prisma.blog.create({
        data: {
            title,
            body,
            userId,
        },
    });

    return newBlog;
}
