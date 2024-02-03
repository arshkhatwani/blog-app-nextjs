import BlogCard from "@/app/components/BlogCard";
import { getUserBlogs, getUserDeletedBlogs } from "../actions";
import ToggleBlogs from "@/app/components/ToggleBlogs";

export default async function MineBlogs({
    searchParams,
}: {
    searchParams?: { [type: string]: string | undefined };
}) {
    let blogs;
    if (searchParams?.type === "deleted") {
        blogs = await getUserDeletedBlogs();
    } else {
        blogs = await getUserBlogs();
    }

    return (
        <div className="flex flex-col px-10 py-4 gap-5">
            <div className="mb-3">
                <ToggleBlogs type={searchParams?.type} />
            </div>

            {blogs?.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
            ))}
        </div>
    );
}
