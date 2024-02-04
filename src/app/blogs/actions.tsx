"use server";

import getUserDetails from "@/app/utils/getUserDetails";
import prisma from "@/db";
import { Blog } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/blogs/mine"); // To purge cache and ensure new blog is available on this path

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

export async function getBlogById(id: Blog["id"]) {
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id,
            },
        });
        return blog;
    } catch (error) {
        console.log("Could not fetch blog due to this error:", error);
    }
}

export async function deleteBlog(id: Blog["id"]) {
    try {
        const blog = await getBlogById(id);
        const user = await getUserDetails();

        if (user?.id != blog?.userId) return;

        await prisma.blog.update({
            data: {
                del: 1,
            },
            where: {
                id: blog?.id,
            },
        });

        return "OK";
    } catch (error) {
        console.log("Could not fetch blog due to this error:", error);
    }
}

export async function getUserDeletedBlogs() {
    try {
        const user = await getUserDetails();
        if (!user) return;
        const userId = user?.id as string;
        const blogs = await prisma.blog.findMany({
            where: {
                userId,
                del: 1,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return blogs;
    } catch (error) {
        console.log("Could not fetch user blogs due to this error:", error);
    }
}

export async function restoreBlog(id: Blog["id"]) {
    try {
        const blog = await getBlogById(id);
        const user = await getUserDetails();

        if (user?.id != blog?.userId) return;

        await prisma.blog.update({
            data: {
                del: 0,
            },
            where: {
                id: blog?.id,
            },
        });

        return "OK";
    } catch (error) {
        console.log("Could not fetch blog due to this error:", error);
    }
}

export const updateBlog = async ({
    id,
    title,
    body,
}: {
    id: string;
    title: string;
    body: any;
}) => {
    try {
        const blog = await getBlogById(id);
        const user = await getUserDetails();

        if (user?.id != blog?.userId) return;
        const updatedBlog = await prisma.blog.update({
            data: {
                title,
                body,
            },
            where: {
                id,
            },
        });
        return updatedBlog;
    } catch (error) {
        console.log("Could not edit blog due to this error:", error);
    }
};
