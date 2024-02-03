import BlogCard from "@/app/components/BlogCard";
import { getUserBlogs, getUserDeletedBlogs } from "../actions";

export default async function MineBlogs({
    searchParams,
}: {
    searchParams?: { [type: string]: string | string[] | undefined };
}) {
    let blogs;
    if (searchParams?.type === "deleted") {
        blogs = await getUserDeletedBlogs();
    } else {
        blogs = await getUserBlogs();
    }

    return (
        <div className="flex flex-col px-10 py-4 gap-5">
            {blogs?.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
            ))}
        </div>
    );
}
