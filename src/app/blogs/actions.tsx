"use server";

import getUserDetails from "@/app/utils/getUserDetails";
import prisma from "@/db";

export async function createBlog(data: { title: string; body: any }) {
    const { title, body } = data;
    const user = await getUserDetails();
    if (!user) return;
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

export async function getUserBlogs() {
    try {
        const user = await getUserDetails();
        if (!user) return;
        const userId = user?.id as string;
        const blogs = await prisma.blog.findMany({
            where: {
                userId,
                del: 0,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return blogs;
    } catch (error) {
        console.log("Could not fetch user blogs due to this error:", error);
    }
}
