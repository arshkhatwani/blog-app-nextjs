"use server";

import getUserDetails from "@/app/utils/getUserDetails";
import prisma from "@/db";
import { Blog, BlogComments } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createBlog(data: { title: string; body: any }) {
    try {
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
    } catch (err) {
        console.log("Could not create blog due to error:", err);
    }
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
            include: {
                BlogLikes: {
                    select: {
                        userId: true,
                    },
                },
            },
        });
        return blog;
    } catch (error) {
        console.log("Could not fetch blog due to this error:", error);
    }
}

export async function getBlogByIdWithComments(id: Blog["id"]) {
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id,
            },
            include: {
                BlogLikes: {
                    select: {
                        userId: true,
                    },
                },
                BlogComments: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
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
        console.log("Could not delete blog due to this error:", error);
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
        console.log(
            "Could not fetch user deleted blogs due to this error:",
            error
        );
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
        console.log("Could not restore blog due to this error:", error);
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

        revalidatePath("/blogs/mine");
        revalidatePath(`/blogs/${id}`);

        return updatedBlog;
    } catch (error) {
        console.log("Could not update blog due to this error:", error);
    }
};

export const getPublicBlogs = async () => {
    try {
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                createdAt: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                _count: {
                    select: {
                        BlogComments: true,
                        BlogLikes: true,
                    },
                },
            },
            where: {
                del: 0,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return blogs;
    } catch (err) {
        console.log("Could not fetch public blogs due to this error:", err);
    }
};

export const likeBlog = async (blogId: Blog["id"]) => {
    try {
        const user = await getUserDetails();
        if (!user) return;
        const userId = user.id;
        await prisma.blogLikes.create({
            data: {
                blogId,
                userId,
            },
        });
        revalidatePath(`/blogs/${blogId}`);
        return "OK";
    } catch (err) {
        console.log("Could not like blog due to error: ", err);
    }
};

export const unlikeBlog = async (blogId: Blog["id"]) => {
    try {
        const user = await getUserDetails();
        if (!user) return;
        const userId = user.id;
        await prisma.blogLikes.delete({
            where: {
                blogId_userId: {
                    blogId,
                    userId,
                },
            },
        });
        revalidatePath(`/blogs/${blogId}`);
        return "OK";
    } catch (err) {
        console.log("Could not unlike blog due to error: ", err);
    }
};

export const createBlogComment = async (
    blogId: Blog["id"],
    body: BlogComments["body"]
) => {
    const user = await getUserDetails();
    if (!user?.id) return;

    const newComment = await prisma.blogComments.create({
        data: {
            body,
            blogId,
            userId: user.id,
        },
    });
    revalidatePath(`/blogs/${blogId}`);
    return newComment;
};
