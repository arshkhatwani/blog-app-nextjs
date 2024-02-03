"use client";

import { Blog } from "@prisma/client";
import { getFormattedDate } from "../utils/getFormattedDate";
import { grayBtn, redBtn } from "../constants/uiClasses";
import Link from "next/link";
import { deleteBlog, restoreBlog } from "../blogs/actions";
import { useRouter } from "next/navigation";

export default function BlogCard(blog: Blog) {
    const router = useRouter();
    const onClickEdit = () => {
        router.push(`/blogs/edit/${blog.id}`);
    };
    const onClickDelete = async () => {
        await deleteBlog(blog.id);
        router.refresh();
    };
    const onClickRestore = async () => {
        await restoreBlog(blog.id);
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
                {blog.del == 0 && (
                    <>
                        <button className={grayBtn} onClick={onClickEdit}>
                            Edit
                        </button>
                        <button className={redBtn} onClick={onClickDelete}>
                            Delete
                        </button>
                    </>
                )}
                {blog.del == 1 && (
                    <button className={grayBtn} onClick={onClickRestore}>
                        Restore
                    </button>
                )}
            </div>
        </div>
    );
}
