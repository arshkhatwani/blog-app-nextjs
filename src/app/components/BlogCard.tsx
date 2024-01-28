import React from "react";
import { Blog } from "@prisma/client";
import { getFormattedDate } from "../utils/getFormattedDate";

export default function BlogCard(blog: Blog) {
    return (
        <div className="border py-2 px-3 duration-100 hover:shadow-lg hover:cursor-pointer">
            <div className="text-2xl font-semibold">{blog.title}</div>
            <div>{getFormattedDate(blog.createdAt)}</div>
        </div>
    );
}
