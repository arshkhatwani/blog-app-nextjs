"use client";

import { FormEvent, useState } from "react";
import { primaryBtn } from "../constants/uiClasses";
import { Blog } from "@prisma/client";
import { createBlogComment } from "../blogs/actions";

interface Props {
    blogId: Blog["id"];
}

export default function BlogCommentAdd({ blogId }: Props) {
    const [body, setBody] = useState<string>("");
    const addComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (body.trim() === "") return;
        await createBlogComment(blogId, body.trim());
        setBody("");
    };

    return (
        <form onSubmit={addComment} className="my-3 mt-10">
            <input
                className="text-xl w-full mb-2 outline-none"
                type="text"
                placeholder="Write a comment"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit" className={primaryBtn}>
                Add
            </button>
        </form>
    );
}
