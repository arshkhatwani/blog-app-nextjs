"use client";

import { Blog } from "@prisma/client";
import { getFormattedDate } from "../utils/getFormattedDate";
import { grayBtn, redBtn } from "../constants/uiClasses";
import Link from "next/link";
import { deleteBlog } from "../blogs/actions";
import { useRouter } from "next/navigation";

export default function BlogCard(blog: Blog) {
    const router = useRouter();
    const onClickDelete = async () => {
        await deleteBlog(blog.id);
        router.refresh();
    };
    return (
        <div className="border py-2 px-3 duration-100 hover:shadow-lg">
            <Link href={`/blogs/${blog.id}`}>
                <div className="text-2xl font-semibold hover:cursor-pointer hover:underline">
                    {blog.title}
                </div>
            </Link>
            <div>{getFormattedDate(blog.createdAt)}</div>
            <div className="flex gap-2 items-center py-2">
                <button className={grayBtn}>Edit</button>
                <button className={redBtn} onClick={onClickDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}
