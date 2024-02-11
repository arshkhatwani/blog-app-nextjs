import { Blog } from "@prisma/client";
import Link from "next/link";
import { getFormattedDate } from "../utils/getFormattedDate";
import BlogLikesCount from "./BlogLikesCount";
import BlogCommentsCount from "./BlogCommentsCount";

interface Props {
    id: Blog["id"];
    title: Blog["title"];
    user: {
        name: string;
    };
    createdAt: Blog["createdAt"];
    _count: {
        BlogComments: number;
        BlogLikes: number;
    };
}
export default function PublicBlogCard({
    id,
    title,
    user,
    createdAt,
    _count,
}: Props) {
    return (
        <div className="border py-2 px-3 duration-100 hover:shadow-lg">
            <Link href={`/blogs/${id}`}>
                <div className="text-2xl font-semibold hover:cursor-pointer hover:underline">
                    {title}
                </div>
            </Link>
            <div>{getFormattedDate(createdAt)}</div>
            <div className="flex gap-2 items-center py-2">
                Author: {user.name}
            </div>

            <div className="flex gap-4">
                <BlogLikesCount blogLikes={_count.BlogLikes} />
                <BlogCommentsCount blogComments={_count.BlogComments} />
            </div>
        </div>
    );
}
