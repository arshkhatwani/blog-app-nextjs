import { Blog, BlogLikes } from "@prisma/client";
import { getFormattedDate } from "../utils/getFormattedDate";
import Link from "next/link";

interface Props {
    id: Blog["id"];
    title: Blog["title"];
    user: {
        name: string;
    };
    BlogLikes: BlogLikes[];
    createdAt: Blog["createdAt"];
}
export default function PublicBlogCard({
    id,
    title,
    user,
    BlogLikes,
    createdAt,
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
        </div>
    );
}
